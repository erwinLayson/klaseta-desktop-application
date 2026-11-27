import type { Pool } from "mysql2/promise";
import { pool } from "../database/database.conn.js";
import HttpError from "../types/http-error.js";
import RequestError from "../types/request-error.js";
import ServerError from "../types/server-error.js";
import type { PublicTeacher, Teacher, TeacherUpdate } from "../types/teacher.types.js";
import Teachers from "../model/teachers.model.js";
import Users from "../model/users.model.js";

/** Business logic for teachers: validation plus user-link and uniqueness checks. */
class TeachersService {
    /** @param dbPool - Pool used to borrow a connection for each operation. */
    constructor(private dbPool: Pool) {}

    /**
     * Runs a callback with both Teachers and Users models on one connection, then releases it.
     * @param callback - Work to perform with the models.
     */
    private async withModels<T>(callback: (teachers: Teachers, users: Users) => Promise<T>): Promise<T> {
        const connection = await this.dbPool.getConnection();
        try {
            return await callback(new Teachers(connection), new Users(connection));
        } finally {
            connection.release();
        }
    }

    /** Rejects ids that are not positive integers. */
    private validateId(id: number, label: string = "teacher id"): void {
        if (!Number.isInteger(id) || id <= 0) {
            throw new RequestError(`Invalid ${label}`);
        }
    }

    /** Ensures a create payload has a valid user id and an optional string/null department. */
    private validateCreate(teacher: Teacher): void {
        if (!teacher || !Number.isInteger(teacher.userId) || teacher.userId <= 0) {
            throw new RequestError("A valid userId is required");
        }
        this.validateDepartment(teacher.department);
    }

    /** Ensures an update payload only contains valid user ids and departments. */
    private validateUpdate(changes: TeacherUpdate): void {
        if (!changes) {
            throw new RequestError("Bad request");
        }
        if (changes.userId !== undefined) {
            this.validateId(changes.userId, "user id");
        }
        this.validateDepartment(changes.department);
    }

    /** Ensures a department is a string, `null`, or omitted. */
    private validateDepartment(department: string | null | undefined): void {
        if (department !== undefined && department !== null && typeof department !== "string") {
            throw new RequestError("department must be a string or null");
        }
    }

    /**
     * Creates a teacher profile after verifying the linked user exists and has no profile yet.
     * @returns The created teacher.
     */
    async create(teacher: Teacher): Promise<PublicTeacher> {
        this.validateCreate(teacher);

        return this.withModels(async (teachers, users) => {
            if (!(await users.findById(teacher.userId))) {
                throw new HttpError(404, "User not found");
            }
            if (await teachers.findByUserId(teacher.userId)) {
                throw new HttpError(409, "A teacher for this user already exists");
            }

            const id = await teachers.createTeacher(teacher);
            const created = await teachers.findById(id);
            if (!created) {
                throw new ServerError(new Error(`Teacher ${id} was not found after insert`), "Failed to retrieve the created teacher");
            }
            return created;
        });
    }

    /** Lists all teachers. */
    async findAll(): Promise<PublicTeacher[]> {
        return this.withModels((teachers) => teachers.findAll());
    }

    /**
     * Retrieves a teacher by primary key.
     * @throws HttpError 404 when the teacher does not exist.
     */
    async findById(id: number): Promise<PublicTeacher> {
        this.validateId(id);
        const teacher = await this.withModels((teachers) => teachers.findById(id));
        if (!teacher) {
            throw new HttpError(404, "Teacher not found");
        }
        return teacher;
    }

    /**
     * Retrieves the teacher profile linked to a user id.
     * @throws HttpError 404 when no profile exists for the user.
     */
    async findByUserId(userId: number): Promise<PublicTeacher> {
        this.validateId(userId, "user id");
        const teacher = await this.withModels((teachers) => teachers.findByUserId(userId));
        if (!teacher) {
            throw new HttpError(404, "Teacher not found for this user");
        }
        return teacher;
    }

    /**
     * Applies validated changes to a teacher, rechecking the user link when it changes.
     * @returns The updated teacher.
     */
    async update(id: number, changes: TeacherUpdate): Promise<PublicTeacher> {
        this.validateId(id);
        this.validateUpdate(changes);

        return this.withModels(async (teachers, users) => {
            const existing = await teachers.findById(id);
            if (!existing) {
                throw new HttpError(404, "Teacher not found");
            }

            if (changes.userId !== undefined && changes.userId !== existing.userId) {
                if (!(await users.findById(changes.userId))) {
                    throw new HttpError(404, "User not found");
                }
                const duplicate = await teachers.findByUserId(changes.userId);
                if (duplicate && duplicate.id !== id) {
                    throw new HttpError(409, "A teacher for this user already exists");
                }
            }

            await teachers.updateById(id, changes);
            const updated = await teachers.findById(id);
            if (!updated) {
                throw new ServerError(new Error(`Teacher ${id} was not found after update`), "Failed to retrieve the updated teacher");
            }
            return updated;
        });
    }

    /** Removes a teacher by id, throwing 404 when it does not exist. */
    async remove(id: number): Promise<void> {
        this.validateId(id);

        await this.withModels(async (teachers) => {
            if (!(await teachers.findById(id))) {
                throw new HttpError(404, "Teacher not found");
            }
            await teachers.deleteById(id);
        });
    }
}

/** Shared service instance bound to the application connection pool. */
const teachersService = new TeachersService(pool);
export default teachersService;
