import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { Classroom, ClassroomUpdate, PublicClassroom } from "../types/classroom.types.js";
import ServerError from "../types/server-error.js";

/** Raw `classrooms` row shape as returned by MySQL, using snake_case columns. */
type ClassroomRowPacket = RowDataPacket & {
    id: number;
    name: string;
    code: string | null;
    section: string | null;
    grade_level: string | null;
    description: string | null;
    teacher_id: number | null;
    academic_year: string | null;
    semester: string | null;
};

/** Maps a raw database row to the camelCase `PublicClassroom` shape. */
const toPublicClassroom = (row: ClassroomRowPacket): PublicClassroom => ({
    id: row.id,
    name: row.name,
    code: row.code,
    section: row.section,
    gradeLevel: row.grade_level,
    description: row.description,
    teacherId: row.teacher_id,
    academicYear: row.academic_year,
    semester: row.semester,
});

const allowUpdateFields = [
    "name",
    "code",
    "section",
    "grade_level",
    "description",
    "teacher_id",
    "academic_year",
    "semester",
];

/** Data-access layer for the `classrooms` table; each instance works on one pooled connection. */
class Classrooms {
    /** @param connection - Connection borrowed from the pool for this unit of work. */
    constructor(private connection: PoolConnection) { }

    /**
     * Inserts a new classroom.
     * @param classroom - Classroom details.
     * @returns The generated classroom id.
     */
    async createClassroom(classroom: Classroom): Promise<number> {
        try {
            const { name, code, section, gradeLevel, description, teacherId, academicYear, semester } = classroom;
            const query = `
                INSERT INTO classrooms (name, code, section, grade_level, description, teacher_id, academic_year, semester)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                name,
                code ?? null,
                section ?? null,
                gradeLevel ?? null,
                description ?? null,
                teacherId ?? null,
                academicYear ?? null,
                semester ?? null,
            ];
            const [result] = await this.connection.execute<ResultSetHeader>(query, values);
            return result.insertId;
        } catch (err: any) {
            throw new ServerError(err, "Internal Server Error");
        }
    }

    /** Returns all classrooms, ordered by id. */
    async findAll(): Promise<PublicClassroom[]> {
        try {
            const [rows] = await this.connection.execute<ClassroomRowPacket[]>(
                `SELECT id, name, code, section, grade_level, description, teacher_id, academic_year, semester FROM classrooms ORDER BY id`
            );
            return rows.map(toPublicClassroom);
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds a classroom by primary key.
     * @returns The classroom, or `null` when not found.
     */
    async findById(id: number): Promise<PublicClassroom | null> {
        try {
            const [rows] = await this.connection.execute<ClassroomRowPacket[]>(
                `SELECT id, name, code, section, grade_level, description, teacher_id, academic_year, semester FROM classrooms WHERE id = ?`,
                [id]
            );
            const row = rows[0];
            return row ? toPublicClassroom(row) : null;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds a classroom by unique code.
     * @returns The classroom, or `null` when not found.
     */
    async findByCode(code: string): Promise<PublicClassroom | null> {
        try {
            const [rows] = await this.connection.execute<ClassroomRowPacket[]>(
                `SELECT id, name, code, section, grade_level, description, teacher_id, academic_year, semester FROM classrooms WHERE code = ?`,
                [code]
            );
            const row = rows[0];
            return row ? toPublicClassroom(row) : null;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Finds all classrooms assigned to a teacher.
     * @returns Array of classrooms taught by the teacher.
     */
    async findByTeacherId(teacherId: number): Promise<PublicClassroom[]> {
        try {
            const [rows] = await this.connection.execute<ClassroomRowPacket[]>(
                `SELECT id, name, code, section, grade_level, description, teacher_id, academic_year, semester FROM classrooms WHERE teacher_id = ? ORDER BY id`,
                [teacherId]
            );
            return rows.map(toPublicClassroom);
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Updates only the provided fields of a classroom row.
     * @returns `true` when at least one row was affected.
     */
    async updateById(id: number, changes: ClassroomUpdate): Promise<boolean> {
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
                return false
            }

            const query = `UPDATE classrooms SET ${sets.join(", ")} WHERE id = ?`;
            const [result] = await this.connection.execute<ResultSetHeader>(query, [...values, id]);
            return result.affectedRows > 0;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }

    /**
     * Deletes a classroom row by primary key.
     * @returns `true` when a row was removed.
     */
    async deleteById(id: number): Promise<boolean> {
        try {
            const [result] = await this.connection.execute<ResultSetHeader>(
                `DELETE FROM classrooms WHERE id = ?`,
                [id]
            );
            return result.affectedRows > 0;
        } catch (err: any) {
            throw new ServerError(err);
        }
    }
}

export default Classrooms;
