import type { PoolConnection } from "mysql2/promise";
import type { PublicUser, User, UserRow, UserUpdate } from "../types/user.types.js";
/** Data-access layer for the `users` table; each instance works on one pooled connection. */
declare class Users {
    private connection;
    /** @param connection - Connection borrowed from the pool for this unit of work. */
    constructor(connection: PoolConnection);
    /**
     * Inserts a new user row.
     * @param user - User data including the already-hashed password.
     * @returns The generated user id.
     */
    createUser(user: User): Promise<number>;
    /** Returns every user without password fields, ordered by id. */
    findAll(): Promise<PublicUser[]>;
    /**
     * Finds a user by primary key.
     * @returns The public user, or `null` when no row matches.
     */
    findById(id: number): Promise<PublicUser | null>;
    /**
     * Finds a user by email, including the password hash for authentication.
     * @returns The full user row, or `null` when no row matches.
     */
    findByEmail(email: string): Promise<UserRow | null>;
    /**
     * Finds a user by username, including the password hash.
     * @returns The full user row, or `null` when no row matches.
     */
    findByUsername(username: string): Promise<UserRow | null>;
    /**
     * Updates only the provided fields of a user row.
     * @returns `true` when at least one row was affected.
     */
    updateById(id: number, changes: UserUpdate): Promise<boolean>;
    /**
     * Deletes a user row by primary key.
     * @returns `true` when a row was actually removed.
     */
    deleteById(id: number): Promise<boolean>;
}
export default Users;
//# sourceMappingURL=users.model.d.ts.map