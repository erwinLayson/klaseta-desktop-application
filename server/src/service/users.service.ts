import type { Pool } from "mysql2/promise";
import { pool } from "../database/database.conn.js";
import HttpError from "../types/http-error.js";
import RequestError from "../types/request-error.js";
import ServerError from "../types/server-error.js";
import type { PublicUser, User, UserUpdate } from "../types/user.types.js";
import Users from "../model/users.model.js";

import {isNonEmptyString} from "../helper/isNonEmptyString.js"

class UsersService {
    constructor(private dbPool: Pool) {}

    private async withModel<T>(callback: (users: Users) => Promise<T>): Promise<T> {
        const connection = await this.dbPool.getConnection();
        try {
            return await callback(new Users(connection));
        } finally {
            connection.release();
        }
    }

    private validateId(id: number): void {
        if (!Number.isInteger(id) || id <= 0) {
            throw new RequestError("Invalid user id");
        }
    }

    private validateCreate(user: User): void {
        if (!isNonEmptyString(user?.email) || !isNonEmptyString(user?.username) || !isNonEmptyString(user?.password)) {
            throw new RequestError("email, username and password are required");
        }
    }

    private validateUpdate(changes: UserUpdate): void {
        if (
            (changes.email !== undefined && !isNonEmptyString(changes.email)) ||
            (changes.username !== undefined && !isNonEmptyString(changes.username)) ||
            (changes.password !== undefined && !isNonEmptyString(changes.password))
        ) {
            throw new RequestError("Provided fields must be non-empty strings");
        }
    }

    async create(user: User): Promise<PublicUser> {
        this.validateCreate(user);

        return this.withModel(async (users) => {
            if (await users.findByEmail(user.email)) {
                throw new HttpError(409, "A user with this email already exists");
            }
            if (await users.findByUsername(user.username)) {
                throw new HttpError(409, "A user with this username already exists");
            }

            const id = await users.createUser(user);
            const created = await users.findById(id);
            if (!created) {
                throw new ServerError(new Error(`User ${id} was not found after insert`), "Failed to retrieve the created user");
            }
            return created;
        });
    }

    async findAll(): Promise<PublicUser[]> {
        return this.withModel((users) => users.findAll());
    }

    async findById(id: number): Promise<PublicUser> {
        this.validateId(id);
        const user = await this.withModel((users) => users.findById(id));
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        return user;
    }

    async update(id: number, changes: UserUpdate): Promise<PublicUser> {
        this.validateId(id);
        this.validateUpdate(changes);

        return this.withModel(async (users) => {
            if (!(await users.findById(id))) {
                throw new HttpError(404, "User not found");
            }

            if (changes.email !== undefined) {
                const existing = await users.findByEmail(changes.email);
                if (existing && existing.id !== id) {
                    throw new HttpError(409, "A user with this email already exists");
                }
            }
            if (changes.username !== undefined) {
                const existing = await users.findByUsername(changes.username);
                if (existing && existing.id !== id) {
                    throw new HttpError(409, "A user with this username already exists");
                }
            }

            await users.updateById(id, changes);
            const updated = await users.findById(id);
            if (!updated) {
                throw new ServerError(new Error(`User ${id} was not found after update`), "Failed to retrieve the updated user");
            }
            return updated;
        });
    }

    async remove(id: number): Promise<void> {
        this.validateId(id);

        await this.withModel(async (users) => {
            if (!(await users.findById(id))) {
                throw new HttpError(404, "User not found");
            }
            await users.deleteById(id);
        });
    }
}

export const usersService = new UsersService(pool);
export default usersService;
