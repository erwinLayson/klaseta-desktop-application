import type { Pool } from "mysql2/promise";
import type { PublicTeacher, Teacher, TeacherUpdate } from "../types/teacher.types.js";
/** Business logic for teachers: validation plus user-link and uniqueness checks. */
declare class TeachersService {
    private dbPool;
    /** @param dbPool - Pool used to borrow a connection for each operation. */
    constructor(dbPool: Pool);
    /**
     * Runs a callback with both Teachers and Users models on one connection, then releases it.
     * @param callback - Work to perform with the models.
     */
    private withModels;
    /**
     * Runs a callback with both models in a single transaction, rolling back on any failure.
     * @param callback - Work to perform before committing.
     */
    private withTransaction;
    /** Rejects ids that are not positive integers. */
    private validateId;
    /** Ensures a create payload has the teacher name and credentials needed for the user account. */
    private validateCreate;
    /** Ensures an update payload only contains valid user ids and departments. */
    private validateUpdate;
    /** Ensures a department is a string, `null`, or omitted. */
    private validateDepartment;
    /**
     * Creates a user account from the teacher credentials, then the teacher linked to it.
     * Both inserts share one transaction, so a failed teacher insert rolls the user back.
     * @returns The created teacher.
     */
    create(teacher: Teacher): Promise<PublicTeacher>;
    /** Lists all teachers. */
    findAll(): Promise<PublicTeacher[]>;
    /**
     * Retrieves a teacher by primary key.
     * @throws HttpError 404 when the teacher does not exist.
     */
    findById(id: number): Promise<PublicTeacher>;
    /**
     * Retrieves the teacher profile linked to a user id.
     * @throws HttpError 404 when no profile exists for the user.
     */
    findByUserId(userId: number): Promise<PublicTeacher>;
    /**
     * Applies validated changes to a teacher, rechecking the user link when it changes.
     * @returns The updated teacher.
     */
    update(id: number, changes: TeacherUpdate): Promise<PublicTeacher>;
    /** Removes a teacher by id, throwing 404 when it does not exist. */
    remove(id: number): Promise<void>;
}
/** Shared service instance bound to the application connection pool. */
declare const teachersService: TeachersService;
export default teachersService;
//# sourceMappingURL=teachers.service.d.ts.map