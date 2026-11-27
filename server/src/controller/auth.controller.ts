import type { Request, Response, NextFunction } from "express";
import * as authService from "../service/auth.service.js";
import type { User } from "../types/user.types.js";

import jwt from "jsonwebtoken";
import isValidEnv from "../helper/isValidEnv.js";

// Helper function to parse and validate the user payload
import { normalizeString } from "../helper/normalizeString.js";

/** POST /login - Authenticates credentials and attaches the user to the request. */
export const authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body as Omit<User, "id" | "role" | "username">;

        const user = await authService.authLogin(
            {
                email: normalizeString(email),
                password: String(password)
            }
        );

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
                username: user.username
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
