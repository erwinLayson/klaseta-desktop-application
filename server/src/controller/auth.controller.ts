import type { Request, Response, NextFunction } from "express";
import authService from "../service/auth.service.js";
import type { User } from "../types/user.types.js";

import jwt from "jsonwebtoken";
import isValidEnv from "../helper/isValidEnv.js";

// Helper function to parse and validate the user payload
import { normalizeString } from "../helper/normalizeString.js";


function validateUserPayload(payload: Omit<User, "id" | "role" | "username">): void {
    if (!payload || typeof payload !== "object") {
        throw new Error("Invalid payload");
    }

    for (const [key, value] of Object.entries(payload)) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error(`Invalid ${key}`);
        }
    }
}

/** POST /login - Authenticates credentials and attaches the user to the request. */
export const authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body as Omit<User, "id" | "role" | "username">;        
        validateUserPayload({ email, password });

        const user = await authService.authLogin(
            {
                email,
                password
            }
        );

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                username: user.username,
                email: user.email
            },
            isValidEnv("JWT_SECRET"),
            {
                expiresIn: "5h"
            }
        )

        res.cookie(isValidEnv("LOGIN_SESSION"), token, {
            httpOnly: true,
            secure: isValidEnv("NODE_ENV") === "production",
            maxAge: 5 * 60 * 60 * 1000, // 5 hours
            sameSite: isValidEnv("NODE_ENV") === "production" ? "none" : "lax"
        })

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

/** GET /me - Responds with the authenticated user attached by verifyToken. */
export const authMe = (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
}

/** POST /logout - Clears the login session cookie. */
export const authLogout = (_req: Request, res: Response, next: NextFunction): void => {
    try {
        res.clearCookie(isValidEnv("LOGIN_SESSION"), {
            httpOnly: true,
            secure: isValidEnv("NODE_ENV") === "production",
            sameSite: isValidEnv("NODE_ENV") === "production" ? "none" : "lax"
        });
        res.status(200).json({ message: "Signed out" });
    } catch (error) {
        next(error);
    }
}
