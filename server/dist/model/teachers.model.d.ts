import type { PoolConnection } from "mysql2/promise";
import type { PublicTeacher, TeacherRecord, TeacherUpdate } from "../types/teacher.types.js";
/** Data-access layer for the `teachers` table; each instance works on one pooled connection. */
declare class Teachers {
    private connection;
    /** @param connection - Connection borrowed from the pool for this unit of work. */
    constructor(connection: PoolConnection);
    /**
     * Inserts a teacher profile linked to an existing user.
     * @param teacher - Teacher name, generated user link, and optional department.
     * @returns The generated teacher id.
     */
    createTeacher(teacher: TeacherRecord): Promise<number>;
    /** Returns every teacher, ordered by id. */
    findAll(): Promise<PublicTeacher[]>;
    /**
     * Finds a teacher by primary key.
     * @returns The teacher, or `null` when no row matches.
     */
    findById(id: number): Promise<PublicTeacher | null>;
    /**
     * Finds the teacher profile associated with a user id.
     * @returns The teacher, or `null` when the user has no teacher profile.
     */
    findByUserId(userId: number): Promise<PublicTeacher | null>;
    /**
     * Updates only the provided fields of a teacher row.
     * @returns `true` when at least one row was affected.
     */
    updateById(id: number, changes: TeacherUpdate): Promise<boolean>;
    /**
     * Deletes a teacher row by primary key.
     * @returns `true` when a row was actually removed.
     */
    deleteById(id: number): Promise<boolean>;
}
export default Teachers;
//# sourceMappingURL=teachers.model.d.ts.map