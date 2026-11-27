import type { Pool, PoolConnection } from "mysql2/promise";
import { pool } from "../database/database.conn.js";
import HttpError from "../types/http-error.js";
import RequestError from "../types/request-error.js";
import ServerError from "../types/server-error.js";
import type { PublicStudent, Student, StudentUpdate } from "../types/student.types.js";
import { userRoles } from "../types/user.types.js";
import Students from "../model/students.model.js";
import UserService from "./users.service.js"

import bcrypt from "bcrypt";

import { isNonEmptyString } from "../helper/isNonEmptyString.js";
import isValidEnv from "../helper/isValidEnv.js";
import usersService from "./users.service.js";

/** Business logic for students: validation plus user-link and uniqueness checks. */
class StudentsService {
    /** @param dbPool - Pool used to borrow a connection for each operation. */
    constructor(private dbPool: Pool) { }

    /**
     * Runs a callback with both Students and Users models on one connection, then releases it.
     * @param callback - Work to perform with the models.
     */
    private async withModels<T>(callback: (students: Students) => Promise<T>): Promise<T> {
        const connection = await this.dbPool.getConnection();
        try {
            return await callback(new Students(connection))
        } finally {
            connection.release();
        }
    }

    /**
     * Runs a callback with both models in a single transaction, rolling back on any failure.
     * @param callback - Work to perform before committing.
     */
    private async withTransaction<T>(callback: (students: Students, conn: PoolConnection) => Promise<T>): Promise<T> {
        const connection = await this.dbPool.getConnection();
        try {
            await connection.beginTransaction();
            try {
                const result = await callback(new Students(connection), connection);
                await connection.commit();
                return result;
            } catch (error) {
                await connection.rollback();
                throw error;
            }
        } finally {
            connection.release();
        }
    }

    /** Rejects ids that are not positive integers. */
    private validateId(id: number, label: string = "student id"): void {
        if (!Number.isInteger(id) || id <= 0) {
            throw new RequestError(`Invalid ${label}`);
        }
    }

    /** Ensures an optional string field is a string, `null`, or undefined. */
    private validateOptionalString(value: unknown, fieldName: string): void {
        if (value !== undefined && value !== null && typeof value !== "string") {
            throw new RequestError(`${fieldName} must be a string or null`);
        }
    }

    /** Ensures a create payload has the student name and credentials needed for the user account. */
    private validateCreate(student: Student): void {
        if (
            !student ||
            !isNonEmptyString(student.firstname) ||
            typeof student.middlename !== "string" ||
            !isNonEmptyString(student.lastname) ||
            !isNonEmptyString(student.email) ||
            !isNonEmptyString(student.username) ||
            !isNonEmptyString(student.password)
        ) {
            throw new RequestError("firstname, middlename, lastname, email, username and password are required");
        }
        this.validateOptionalString(student.gradeLevel, "gradeLevel");
        this.validateOptionalString(student.section, "section");
        this.validateOptionalString(student.lrn, "lrn");
    }

    /** Ensures an update payload only contains valid user ids and string fields. */
    private validateUpdate(changes: StudentUpdate): void {
        if (!changes) {
            throw new RequestError("Bad request");
        }
        if (changes.userId !== undefined) {
            this.validateId(changes.userId, "user id");
        }
        this.validateOptionalString(changes.gradeLevel, "gradeLevel");
        this.validateOptionalString(changes.section, "section");
        this.validateOptionalString(changes.lrn, "lrn");
    }

    /**
     * Creates a user account from the student credentials, then the student profile linked to it.
     * Both inserts share one transaction, so a failed student insert rolls the user back.
     * @returns The created student.
     */
    async create(student: Student): Promise<PublicStudent> {
        this.validateCreate(student);

        return this.withTransaction(async (students) => {
            if (await UserService.findByEmail(student.email)) {
                throw new HttpError(409, "A user with this email already exists");
            }
            if (await UserService.findByUsername(student.username)) {
                throw new HttpError(409, "A user with this username already exists");
            }

            const studentPassword = student.password ? student.password : isValidEnv("USER_DEFAULT_PASSWORD");

            const { id: userId } = await UserService.create({
                email: student.email,
                username: student.username,
                password: studentPassword,
                role: userRoles.STUDENT,
            });

            const id = await students.createStudent({ ...student, userId });
            const created = await students.findById(id);
            if (!created) {
                throw new ServerError(new Error(`Student ${id} was not found after insert`), "Failed to retrieve the created student");
            }
            return created;
        });
    }

    /** Lists all students. */
    async findAll(): Promise<PublicStudent[]> {
        return this.withModels((students) => students.findAll());
    }

    /**
     * Retrieves a student by primary key.
     * @throws HttpError 404 when the student does not exist.
     */
    async findById(id: number): Promise<PublicStudent> {
        this.validateId(id);
        const student = await this.withModels((students) => students.findById(id));
        if (!student) {
            throw new HttpError(404, "Student not found");
        }
        return student;
    }

    /**
     * Retrieves the student profile linked to a user id.
     * @throws HttpError 404 when no profile exists for the user.
     */
    async findByUserId(userId: number): Promise<PublicStudent> {
        this.validateId(userId, "user id");
        const student = await this.withModels((students) => students.findByUserId(userId));
        if (!student) {
            throw new HttpError(404, "Student not found for this user");
        }
        return student;
    }

    /**
     * Retrieves the student profile by LRN.
     * @throws HttpError 404 when no profile exists for the LRN.
     */
    async findByLrn(lrn: string): Promise<PublicStudent> {
        if (!isNonEmptyString(lrn)) {
            throw new RequestError("Invalid LRN");
        }
        const student = await this.withModels((students) => students.findByLrn(lrn));
        if (!student) {
            throw new HttpError(404, "Student not found for this LRN");
        }
        return student;
    }

    /**
     * Applies validated changes to a student, rechecking the user link when it changes.
     * @returns The updated student.
     */
    async update(id: number, changes: StudentUpdate): Promise<PublicStudent> {
        this.validateId(id);
        this.validateUpdate(changes);

        return this.withModels(async (students) => {
            const existing = await students.findById(id);
            if (!existing) {
                throw new HttpError(404, "Student not found");
            }

            if (changes.userId !== undefined && changes.userId !== existing.userId) {
                if (!(await usersService.findById(changes.userId))) {
                    throw new HttpError(404, "User not found");
                }
                const duplicate = await students.findByUserId(changes.userId);
                if (duplicate && duplicate.id !== id) {
                    throw new HttpError(409, "A student for this user already exists");
                }
            }

            await students.updateById(id, changes);
            const updated = await students.findById(id);
            if (!updated) {
                throw new ServerError(new Error(`Student ${id} was not found after update`), "Failed to retrieve the updated student");
            }
            return updated;
        });
    }

    /** Removes a student by id, throwing 404 when it does not exist. */
    async remove(id: number): Promise<void> {
        this.validateId(id);

        await this.withModels(async (students) => {
            if (!(await students.findById(id))) {
                throw new HttpError(404, "Student not found");
            }
            await students.deleteById(id);
        });
    }
}

/** Shared service instance bound to the application connection pool. */
const studentsService = new StudentsService(pool);
export default studentsService;
