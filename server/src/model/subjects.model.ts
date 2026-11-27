import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { PublicSubject, Subject, SubjectUpdate } from "../types/subject.types.js";
import ServerError from "../types/server-error.js";

/** Raw `subjects` row shape as returned by MySQL, using snake_case columns. */
type SubjectRowPacket = RowDataPacket & {
    id: number;
    name: string;
    code: string;
    description: string | null;
    units: number | null;
    department: string | null;
    teacher_id: number | null;
    classroom_id: number | null;
};

/** Maps a raw database row to the camelCase `PublicSubject` shape. */
const toPublicSubject = (row: SubjectRowPacket): PublicSubject => ({
    id: row.id,
    name: row.name,
    code: row.code,
    description: row.description,
    units: row.units !== null ? Number(row.units) : null,
    department: row.department,
    teacherId: row.teacher_id,
    classroomId: row.classroom_id,
});

const allowUpdateFields = [
    "name",
    "code",
    "description",
    "units",
    "department",
    "teacher_id",
    "classroom_id"
];

/** Data-access layer for the `subjects` table; each instance works on one pooled connection. */
class Subjects {
    /** @param connection - Connection borrowed from the pool for this unit of work. */
    constructor(private connection: PoolConnection) { }

    /**
     * Inserts a new subject.
     * @param subject - Subject details.
     * @returns The generated subject id.
     */
    async createSubject(subject: Subject): Promise<number> {
        try {
            const { name, code, description, units, department, teacherId, classroomId } = subject;
            const query = `
                INSERT INTO subjects (name, code, description, units, department, teacher_id, classroom_id)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                name,
                code,
                description ?? null,
                units ?? null,
                department ?? null,
                teacherId ?? null,
                classroomId ?? null,
            ];
            const [result] = await this.connection.execute<ResultSetHeader>(query, values);
            return result.insertId;
        } catch (err: any) {
            throw new ServerError(err, "Internal Server Error");
        }
    }

    /** Returns all subjects, ordered by id. */
    async findAll(): Promise<PublicSubject[]> {
        try {
            const [rows] = await this.connection.execute<SubjectRowPacket[]>(
                `SELECT id, name, code, description, units, department, teacher_id, classroom_id FROM subjects ORDER BY id`
            );
            return rows.map(toPublicSubject);
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds a subject by primary key.
     * @returns The subject, or `null` when not found.
     */
    async findById(id: number): Promise<PublicSubject | null> {
        try {
            const [rows] = await this.connection.execute<SubjectRowPacket[]>(
                `SELECT id, name, code, description, units, department, teacher_id, classroom_id FROM subjects WHERE id = ?`,
                [id]
            );
            const row = rows[0];
            return row ? toPublicSubject(row) : null;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds a subject by its unique code.
     * @returns The subject, or `null` when not found.
     */
    async findByCode(code: string): Promise<PublicSubject | null> {
        try {
            const [rows] = await this.connection.execute<SubjectRowPacket[]>(
                `SELECT id, name, code, description, units, department, teacher_id, classroom_id FROM subjects WHERE code = ?`,
                [code]
            );
            const row = rows[0];
            return row ? toPublicSubject(row) : null;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds all subjects taught by a specific teacher.
     * @returns Array of subjects for the teacher.
     */
    async findByTeacherId(teacherId: number): Promise<PublicSubject[]> {
        try {
            const [rows] = await this.connection.execute<SubjectRowPacket[]>(
                `SELECT id, name, code, description, units, department, teacher_id, classroom_id FROM subjects WHERE teacher_id = ? ORDER BY id`,
                [teacherId]
            );
            return rows.map(toPublicSubject);
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds all subjects belonging to a classroom.
     * @returns Array of subjects for the classroom.
     */
    async findByClassroomId(classroomId: number): Promise<PublicSubject[]> {
        try {
            const [rows] = await this.connection.execute<SubjectRowPacket[]>(
                `SELECT id, name, code, description, units, department, teacher_id, classroom_id FROM subjects WHERE classroom_id = ? ORDER BY id`,
                [classroomId]
            );
            return rows.map(toPublicSubject);
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Updates only the provided fields of a subject row.
     * @returns `true` when at least one row was affected.
     */
    async updateById(id: number, changes: SubjectUpdate): Promise<boolean> {
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

            const query = `UPDATE subjects SET ${sets.join(", ")} WHERE id = ?`;
            const [result] = await this.connection.execute<ResultSetHeader>(query, [...values, id]);
            return result.affectedRows > 0;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Deletes a subject row by primary key.
     * @returns `true` when a row was removed.
     */
    async deleteById(id: number): Promise<boolean> {
        try {
            const [result] = await this.connection.execute<ResultSetHeader>(
                `DELETE FROM subjects WHERE id = ?`,
                [id]
            );
            return result.affectedRows > 0;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }
}

export default Subjects;
