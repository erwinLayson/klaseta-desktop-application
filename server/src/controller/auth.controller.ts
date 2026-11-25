import type{Request, Response, NextFunction } from "express";
import * as authService  from "../service/auth.service.js";
import type { User } from "../types/user.types.js";

// Helper function to parse and validate the user payload
import { normalizeString } from "../helper/normalizeString.js";

export const authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body as Omit<User, "id" | "role" | "username">;

        const user = await authService.authLogin(
            { 
                email: normalizeString(email), 
                password: String(password)
            }
        );

        // initialize the session or token here if needed
        req.user = user;
        res.status(200).json({msg: "Login successful", isVerified: true, user});
    } catch (error) {
        next(error);
    } 
}