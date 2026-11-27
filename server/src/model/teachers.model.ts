import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { PublicTeacher, Teacher, TeacherUpdate } from "../types/teacher.types.js";
import ServerError from "../types/server-error.js";

type TeacherRowPacket = RowDataPacket & {
    firstname: string,
    middlename: string,
    lastname: string,
    id: number;
    user_id: number;
    department: string | null;
};

const toPublicTeacher = (row: TeacherRowPacket): PublicTeacher => ({
    firstname: row.firstname,
    middlename: row.middlename,
    lastname: row.lastname,
    id: row.id,
    userId: row.user_id,
    department: row.department,
});

class Teachers {
    constructor(private connection: PoolConnection) { }

    async createTeacher(teacher: Teacher): Promise<number> {
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

    async updateById(id: number, changes: TeacherUpdate): Promise<boolean> {
        try {
            const sets: string[] = [];
            const values: (number | string | null)[] = [];

            if (changes.userId !== undefined) {
                sets.push("user_id = ?");
                values.push(changes.userId);
            }
            if (changes.department !== undefined) {
                sets.push("department = ?");
                values.push(changes.department ?? null);
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
