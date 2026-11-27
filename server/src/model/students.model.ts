import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { PublicStudent, StudentRecord, StudentUpdate } from "../types/student.types.js";
import ServerError from "../types/server-error.js";

/** Raw `students` row shape as returned by MySQL, using snake_case columns. */
type StudentRowPacket = RowDataPacket & {
    id: number;
    user_id: number;
    firstname: string;
    middlename: string;
    lastname: string;
    grade_level: string | null;
    section: string | null;
    lrn: string | null;
};

/** Maps a raw database row to the camelCase `PublicStudent` shape used by the API. */
const toPublicStudent = (row: StudentRowPacket): PublicStudent => ({
    id: row.id,
    userId: row.user_id,
    firstname: row.firstname,
    middlename: row.middlename,
    lastname: row.lastname,
    gradeLevel: row.grade_level,
    section: row.section,
    lrn: row.lrn,
});

/** Data-access layer for the `students` table; each instance works on one pooled connection. */
class Students {
    /** @param connection - Connection borrowed from the pool for this unit of work. */
    constructor(private connection: PoolConnection) { }

    /**
     * Inserts a student profile linked to an existing user.
     * @param student - Student profile data with generated user link.
     * @returns The generated student id.
     */
    async createStudent(student: StudentRecord): Promise<number> {
        try {
            const { userId, firstname, middlename, lastname, gradeLevel, section, lrn } = student;
            const query = `
                INSERT INTO students (user_id, firstname, middlename, lastname, grade_level, section, lrn)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                userId,
                firstname,
                middlename,
                lastname,
                gradeLevel ?? null,
                section ?? null,
                lrn ?? null,
            ];
            const [result] = await this.connection.execute<ResultSetHeader>(query, values);
            return result.insertId;
        } catch (err: any) {
            throw new ServerError(err, "Internal Server Error");
        }
    }

    /** Returns every student, ordered by id. */
    async findAll(): Promise<PublicStudent[]> {
        try {
            const [rows] = await this.connection.execute<StudentRowPacket[]>(
                `SELECT id, user_id, firstname, middlename, lastname, grade_level, section, lrn FROM students ORDER BY id`
            );
            return rows.map(toPublicStudent);
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds a student by primary key.
     * @returns The student, or `null` when no row matches.
     */
    async findById(id: number): Promise<PublicStudent | null> {
        try {
            const [rows] = await this.connection.execute<StudentRowPacket[]>(
                `SELECT id, user_id, firstname, middlename, lastname, grade_level, section, lrn FROM students WHERE id = ?`,
                [id]
            );
            const row = rows[0];
            return row ? toPublicStudent(row) : null;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds the student profile associated with a user id.
     * @returns The student, or `null` when the user has no student profile.
     */
    async findByUserId(userId: number): Promise<PublicStudent | null> {
        try {
            const [rows] = await this.connection.execute<StudentRowPacket[]>(
                `SELECT id, user_id, firstname, middlename, lastname, grade_level, section, lrn FROM students WHERE user_id = ?`,
                [userId]
            );
            const row = rows[0];
            return row ? toPublicStudent(row) : null;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds a student by Learner Reference Number (LRN).
     * @returns The student, or `null` when no match is found.
     */
    async findByLrn(lrn: string): Promise<PublicStudent | null> {
        try {
            const [rows] = await this.connection.execute<StudentRowPacket[]>(
                `SELECT id, user_id, firstname, middlename, lastname, grade_level, section, lrn FROM students WHERE lrn = ?`,
                [lrn]
            );
            const row = rows[0];
            return row ? toPublicStudent(row) : null;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Updates only the provided fields of a student row.
     * @returns `true` when at least one row was affected.
     */
    async updateById(id: number, changes: StudentUpdate): Promise<boolean> {
        try {
            const sets: string[] = [];
            const values: (number | string | null)[] = [];

            if (changes.userId !== undefined) {
                sets.push("user_id = ?");
                values.push(changes.userId);
            }
            if (changes.firstname !== undefined) {
                sets.push("firstname = ?");
                values.push(changes.firstname);
            }
            if (changes.middlename !== undefined) {
                sets.push("middlename = ?");
                values.push(changes.middlename);
            }
            if (changes.lastname !== undefined) {
                sets.push("lastname = ?");
                values.push(changes.lastname);
            }
            if (changes.gradeLevel !== undefined) {
                sets.push("grade_level = ?");
                values.push(changes.gradeLevel ?? null);
            }
            if (changes.section !== undefined) {
                sets.push("section = ?");
                values.push(changes.section ?? null);
            }
            if (changes.lrn !== undefined) {
                sets.push("lrn = ?");
                values.push(changes.lrn ?? null);
            }

            if (sets.length === 0) {
                return false;
            }

            const query = `UPDATE students SET ${sets.join(", ")} WHERE id = ?`;
            const [result] = await this.connection.execute<ResultSetHeader>(query, [...values, id]);
            return result.affectedRows > 0;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Deletes a student row by primary key.
     * @returns `true` when a row was actually removed.
     */
    async deleteById(id: number): Promise<boolean> {
        try {
            const [result] = await this.connection.execute<ResultSetHeader>(
                `DELETE FROM students WHERE id = ?`,
                [id]
            );
            return result.affectedRows > 0;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }
}

export default Students;
