import type{Request, Response, NextFunction } from "express";
import * as authService  from "../service/auth.service.js";
import type { User } from "../types/user.types.js";

export const authLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body as Omit<User, "id" | "role" | "username">;

        const user = await authService.authLogin({ email: email.trim(), password: String(password)});
        req.user = user;
        res.status(200).json({msg: "Login successful", isVerified: true, user});
    } catch (error) {
        next(error);
    } 
}