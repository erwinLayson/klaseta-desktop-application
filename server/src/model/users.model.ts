import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { PublicUser, User, UserRow, UserUpdate } from "../types/user.types.js";
import ServerError from "../types/server-error.js";

/** Data-access layer for the `users` table; each instance works on one pooled connection. */
class Users {
    /** @param connection - Connection borrowed from the pool for this unit of work. */
    constructor(private connection: PoolConnection) {}

    /**
     * Inserts a new user row.
     * @param user - User data including the already-hashed password.
     * @returns The generated user id.
     */
    async createUser(user: User): Promise<number> {
        try {
            const { email, password, username, role } = user;
            const query = `INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, ?)`;
            const [result] = await this.connection.execute<ResultSetHeader>(query, [email, password, username, role]);
            return result.insertId;
        }catch(err: any) {
            throw new ServerError(err, "Internal Server Error")
        }
    }

    /** Returns every user without password fields, ordered by id. */
    async findAll(): Promise<PublicUser[]> {
        try {
            const [rows] = await this.connection.execute<RowDataPacket[]>(
                `SELECT id, email, username, role FROM users ORDER BY id`
            );
            return rows as PublicUser[];
        }catch(err: any) {
            throw new ServerError(err)
        }
    }

    /**
     * Finds a user by primary key.
     * @returns The public user, or `null` when no row matches.
     */
    async findById(id: number): Promise<PublicUser | null> {
        try {
            const [rows] = await this.connection.execute<RowDataPacket[]>(
            `SELECT id, email, username FROM users WHERE id = ?`,
                [id]
            );
            return (rows[0] as PublicUser | undefined) ?? null;
        }catch(err: any) {
            throw new ServerError(err)
        }
    }

    /**
     * Finds a user by email, including the password hash for authentication.
     * @returns The full user row, or `null` when no row matches.
     */
    async findByEmail(email: string): Promise<UserRow | null> {
        try {
            const query = `SELECT id, email, username, role, password FROM users WHERE email = ?`
            const [rows] = await this.connection.execute<RowDataPacket[]>(
                query,
                [email]
            );
            return (rows[0] as UserRow | undefined) ?? null;
        }catch(err: any) {
            throw new ServerError(err)
        }
    }

    /**
     * Finds a user by username, including the password hash.
     * @returns The full user row, or `null` when no row matches.
     */
    async findByUsername(username: string): Promise<UserRow | null> {
        try {
            const [rows] = await this.connection.execute<RowDataPacket[]>(
            `SELECT id, email, username, role, password FROM users WHERE username = ?`,
                [username]
            );
            return (rows[0] as UserRow | undefined) ?? null;
        }catch(err: any) {
            throw new ServerError(err)
        }
    }

    /**
     * Updates only the provided fields of a user row.
     * @returns `true` when at least one row was affected.
     */
    async updateById(id: number, changes: UserUpdate): Promise<boolean> {
        try {
            const sets: string[] = [];
            const values: string[] = [];

            if (changes.email !== undefined) {
                sets.push("email = ?");
                values.push(changes.email);
            }
            if (changes.username !== undefined) {
                sets.push("username = ?");
                values.push(changes.username);
            }
            if (changes.password !== undefined) {
                sets.push("password = ?");
                values.push(changes.password);
            }
            if (changes.role !== undefined) {
                sets.push("role = ?");
                values.push(changes.role);
            }

            if (sets.length === 0) {
                return false;
            }

            const query = `UPDATE users SET ${sets.join(", ")} WHERE id = ?`;
            const [result] = await this.connection.execute<ResultSetHeader>(query, [...values, id]);
            return result.affectedRows > 0;
        }catch(err: any) {
            throw new ServerError(err)
        }
    }

    /**
     * Deletes a user row by primary key.
     * @returns `true` when a row was actually removed.
     */
    async deleteById(id: number): Promise<boolean> {
        try {
            const [result] = await this.connection.execute<ResultSetHeader>(
            `DELETE FROM users WHERE id = ?`,
                [id]
            );
            return result.affectedRows > 0;
        }catch(err: any) {
            throw new ServerError(err)
        }
    }
}

export default Users;
