import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { PublicUser, User, UserRow, UserUpdate } from "../types/user.types.js";
import ServerError from "../types/server-error.js";

class Users {
    constructor(private connection: PoolConnection) {}

    async createUser(user: User): Promise<number> {
        try {
            const { email, password, username } = user;
            const query = `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`;
            const [result] = await this.connection.execute<ResultSetHeader>(query, [email, password, username]);
            return result.insertId;
        }catch(err: any) {
            throw new ServerError(err, "Internal Server Error")
        }
    }

    async findAll(): Promise<PublicUser[]> {
        try {
            const [rows] = await this.connection.execute<RowDataPacket[]>(
                `SELECT id, email, username FROM users ORDER BY id`
            );
            return rows as PublicUser[];
        }catch(err: any) {
            throw new ServerError(err)
        }
    }

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

    async findByEmail(email: string): Promise<UserRow | null> {
        try {
            const query = `SELECT id, email, username, password FROM users WHERE email = ?`
            const [rows] = await this.connection.execute<RowDataPacket[]>(
                query,
                [email]
            );
            return (rows[0] as UserRow | undefined) ?? null;
        }catch(err: any) {
            throw new ServerError(err)
        }
    }

    async findByUsername(username: string): Promise<UserRow | null> {
        try {
            const [rows] = await this.connection.execute<RowDataPacket[]>(
            `SELECT id, email, username, password FROM users WHERE username = ?`,
                [username]
            );
            return (rows[0] as UserRow | undefined) ?? null;
        }catch(err: any) {
            throw new ServerError(err)
        }
    }

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
