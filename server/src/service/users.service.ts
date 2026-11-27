import type { Pool, PoolConnection } from "mysql2/promise";
import { pool } from "../database/database.conn.js";
import HttpError from "../types/http-error.js";
import RequestError from "../types/request-error.js";
import ServerError from "../types/server-error.js";
import type { PublicUser, User, UserUpdate } from "../types/user.types.js";
import Users from "../model/users.model.js";

import bcyrpt from "bcrypt";

import { isNonEmptyString } from "../helper/isNonEmptyString.js"

/** Business logic for users: validation, uniqueness checks, and password hashing. */
class UsersService {
    /** @param dbPool - Pool used to borrow a connection for each operation. */
    constructor(private dbPool: Pool) { }

    /**
     * Runs a callback against a Users model, always releasing the connection afterwards.
     * @param callback - Work to perform with the model.
     */
    private async withModel<T>(callback: (users: Users) => Promise<T>, existingConnection?: PoolConnection): Promise<T> {
        const connection = existingConnection ?? await this.dbPool.getConnection();
        const ownConn = !existingConnection;

        try {
            return await callback(new Users(connection));
        } finally {
            if (ownConn)
                connection.release();
        }
    }

    /** Rejects ids that are not positive integers. */
    private validateId(id: number): void {
        if (!Number.isInteger(id) || id <= 0) {
            throw new RequestError("Invalid user id");
        }
    }

    /** Ensures email, username and password are present before creating a user. */
    private validateCreate(user: User): void {
        if (!isNonEmptyString(user?.email) || !isNonEmptyString(user?.username) || !isNonEmptyString(user?.password)) {
            throw new RequestError("email, username and password are required");
        }
    }

    /** Ensures any supplied update fields are non-empty strings. */
    private validateUpdate(changes: UserUpdate): void {
        if (
            (changes.email !== undefined && !isNonEmptyString(changes.email)) ||
            (changes.username !== undefined && !isNonEmptyString(changes.username)) ||
            (changes.password !== undefined && !isNonEmptyString(changes.password))
        ) {
            throw new RequestError("Provided fields must be non-empty strings");
        }
    }

    /**
     * Creates a user with a hashed password after checking email/username uniqueness.
     * @returns The created user without its password.
     */
    async create(user: User): Promise<PublicUser> {
        this.validateCreate(user);

        return this.withModel(async (users) => {
            if (await users.findByEmail(user.email)) {
                throw new HttpError(409, "A user with this email already exists");
            }
            if (await users.findByUsername(user.username)) {
                throw new HttpError(409, "A user with this username already exists");
            }

            const hashPassword = await bcyrpt.hash(user.password, 10);

            const id = await users.createUser({ ...user, password: hashPassword });
            const created = await users.findById(id);
            if (!created) {
                throw new ServerError(new Error(`User ${id} was not found after insert`), "Failed to retrieve the created user");
            }
            return created;
        });
    }

    /** Lists all users without password fields. */
    async findAll(): Promise<PublicUser[]> {
        return this.withModel((users) => users.findAll());
    }

    /**
     * Retrieves a user by id.
     * @throws HttpError 404 when the user does not exist.
     */
    async findById(id: number): Promise<PublicUser> {
        this.validateId(id);
        const user = await this.withModel((users) => users.findById(id));
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        return user;
    }

    async findByEmail(email: string): Promise<PublicUser> {
        const user = await this.withModel((users) => users.findByEmail(email));
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        return user;
    }

    async findByUsername(username: string): Promise<PublicUser> {
        const user = await this.withModel((users) => users.findByUsername(username));
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        return user;
    }

    /**
     * Applies validated changes to a user, rechecking uniqueness and hashing new passwords.
     * @returns The updated user without its password.
     */
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

            if (changes.password !== undefined) {
                changes.password = await bcyrpt.hash(changes.password, 10);
            }
            console.log("changes", changes);

            await users.updateById(id, changes);
            const updated = await users.findById(id);
            if (!updated) {
                throw new ServerError(new Error(`User ${id} was not found after update`), "Failed to retrieve the updated user");
            }
            return updated;
        });
    }

    /** Removes a user by id, throwing 404 when it does not exist. */
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

/** Shared service instance bound to the application connection pool. */
const usersService = new UsersService(pool);
export default usersService;
