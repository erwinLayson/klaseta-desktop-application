import UserModel from "../model/users.model.js";
import { pool } from "../database/database.conn.js";
import httpErrors from "../types/http-error.js";
import bcrypt from "bcrypt";

import type { User } from "../types/user.types.js";

/**
 * Authenticates a user by email and password.
 * @param userPayload - Email and plain-text password from the login request.
 * @returns The authenticated user without its password hash.
 * @throws HttpError 401 when the email is unknown or the password does not match.
 */
export const authLogin = async (userPayload: Omit<User, "id" | "role" | "username">) => {
    const connection = await pool.getConnection();
    const userModel = new UserModel(connection);

    try {
        const user = await userModel.findByEmail(userPayload.email);
        console.log("user", user)
        if (user === null) {
            throw new httpErrors(401, "Invalid email");
        }

        const isPasswordValid = await bcrypt.compare(userPayload.password, user.password);
        console.log("isPasswordValid", isPasswordValid)
        if (!isPasswordValid) {
            throw new httpErrors(401, "Invalid password");
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (error) {
        throw error;
    }finally {
        connection.release();
    }
}
