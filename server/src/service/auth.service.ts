import UserModel from "../model/users.model.js";
import { pool } from "../database/database.conn.js";
import httpErrors from "../types/http-error.js";
import bcrypt from "bcrypt";

import type { User } from "../types/user.types.js";

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