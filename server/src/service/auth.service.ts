import UserModel from "../model/users.model.js";
import { pool } from "../database/database.conn.js";
import httpErrors from "../types/http-error.js";
import bcrypt from "bcrypt";

import type { User } from "../types/user.types.js";

import { normalizeString } from "../helper/normalizeString.js";

class AuthService {  
    /**
     * Authenticates a user by email and password.
     * @param userPayload - Email and plain-text password from the login request.
     * @returns The authenticated user without its password hash.
     * @throws HttpError 401 when the email is unknown or the password does not match.
     */
    private validatePayload<T>(payload: T):void {
        if (!payload || typeof payload !== "object") {
            throw new httpErrors(400, "Invalid payload");
        }

        for(const [key, value] of Object.entries(payload)) {
            if (typeof value !== "string" || value.trim() === "") {
                throw new httpErrors(400, `Invalid ${key}`);
            }
        }
    }

    async authLogin(userPayload: Omit<User, "id" | "role" | "username">){
        this.validatePayload(userPayload);

        const connection = await pool.getConnection();
        const userModel = new UserModel(connection);

        try {
            const user = await userModel.findByEmail(normalizeString(userPayload.email));
            if (user === null) {
                throw new httpErrors(401, "Invalid email or password");
            }

            const isPasswordValid = await bcrypt.compare(userPayload.password, user.password);
            if (!isPasswordValid) {
                throw new httpErrors(401, "Invalid email or password");
            }

            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }

}

const authService = new AuthService();
export default authService;