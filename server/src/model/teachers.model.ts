import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { PublicTeacher, TeacherRecord, TeacherUpdate } from "../types/teacher.types.js";
import ServerError from "../types/server-error.js";

/** Raw `teachers` row shape as returned by MySQL, using the table's snake_case columns. */
type TeacherRowPacket = RowDataPacket & {
    firstname: string,
    middlename: string,
    lastname: string,
    id: number;
    user_id: number;
    department: string | null;
};

/** Maps a raw database row to the camelCase `PublicTeacher` shape used by the API. */
const toPublicTeacher = (row: TeacherRowPacket): PublicTeacher => ({
    firstname: row.firstname,
    middlename: row.middlename,
    lastname: row.lastname,
    id: row.id,
    userId: row.user_id,
    department: row.department,
});

const allowUpdateFields = [
    "user_id",
    "department",
    "firstname",
    "middlename",
    "lastname",
];

/** Data-access layer for the `teachers` table; each instance works on one pooled connection. */
class Teachers {
    /** @param connection - Connection borrowed from the pool for this unit of work. */
    constructor(private connection: PoolConnection) { }

    /**
     * Inserts a teacher profile linked to an existing user.
     * @param teacher - Teacher name, generated user link, and optional department.
     * @returns The generated teacher id.
     */
    async createTeacher(teacher: TeacherRecord): Promise<number> {
        try {
            const { userId, department, firstname, middlename, lastname } = teacher;
            const query = `INSERT INTO teachers (user_id, department, firstname, middlename, lastname) VALUES (?, ?, ?, ?, ?)`;
            const values = [userId, department ?? null, firstname, middlename, lastname];
            const [result] = await this.connection.execute<ResultSetHeader>(query, values);
            return result.insertId;
        } catch (err: any) {
            throw new ServerError(err, "Internal Server Error")
        }
    }

    /** Returns every teacher, ordered by id. */
    async findAll(): Promise<PublicTeacher[]> {
        try {
            const [rows] = await this.connection.execute<TeacherRowPacket[]>(
                `SELECT id, user_id, department, firstname, middlename, lastname FROM teachers ORDER BY id`
            );
            return rows.map(toPublicTeacher);
        } catch (err: any) {
            throw new ServerError(err)
        }
    }

    /**
     * Finds a teacher by primary key.
     * @returns The teacher, or `null` when no row matches.
     */
    async findById(id: number): Promise<PublicTeacher | null> {
        try {
            const [rows] = await this.connection.execute<TeacherRowPacket[]>(
                `SELECT id, user_id, department, firstname, middlename, lastname FROM teachers WHERE id = ?`,
                [id]
            );
            const row = rows[0];
            return row ? toPublicTeacher(row) : null;
        } catch (err: any) {
            throw new ServerError(err)
        }
    }

    /**
     * Finds the teacher profile associated with a user id.
     * @returns The teacher, or `null` when the user has no teacher profile.
     */
    async findByUserId(userId: number): Promise<PublicTeacher | null> {
        try {
            const [rows] = await this.connection.execute<TeacherRowPacket[]>(
                `SELECT id, user_id, department, firstname, middlename, lastname FROM teachers WHERE user_id = ?`,
                [userId]
            );
            const row = rows[0];
            return row ? toPublicTeacher(row) : null;
        } catch (err: any) {
            throw new ServerError(err)
        }
    }

    /**
     * Updates only the provided fields of a teacher row.
     * @returns `true` when at least one row was affected.
     */
    async updateById(id: number, changes: TeacherUpdate): Promise<boolean> {
        try {
            const sets: string[] = [];
            const values: (number | string | null)[] = [];

            for (const [key, value] of Object.entries(changes)) {
                if (allowUpdateFields.includes(key)) {
                    sets.push(`${key} = ?`);
                    values.push(value);
                }
            }

            if (sets.length === 0) {
                return false;
            }

            const query = `UPDATE teachers SET ${sets.join(", ")} WHERE id = ?`;
            const [result] = await this.connection.execute<ResultSetHeader>(query, [...values, id]);
            return result.affectedRows > 0;
        } catch (err: any) {
            throw new ServerError(err)
        }
    }

    /**
     * Deletes a teacher row by primary key.
     * @returns `true` when a row was actually removed.
     */
    async deleteById(id: number): Promise<boolean> {
        try {
            const [result] = await this.connection.execute<ResultSetHeader>(
                `DELETE FROM teachers WHERE id = ?`,
                [id]
            );
            return result.affectedRows > 0;
        } catch (err: any) {
            throw new ServerError(err)
        }
    }
}

export default Teachers;
