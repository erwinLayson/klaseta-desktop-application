import type { NextFunction, Request, Response } from "express";
import studentsService from "../service/students.service.js";
import type { Student, StudentUpdate } from "../types/student.types.js";

/** Converts a route parameter string into a number, or `NaN` when it is missing. */
const parseId = (value: unknown): number =>
    typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;

const parseStringParam = (value: unknown): string =>
    typeof value === "string" ? value : "";

/** GET / - Responds with the list of all students. */
export const listStudents = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const students = await studentsService.findAll();
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

/** GET /:id - Responds with a single student by id. */
export const getStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentsService.findById(parseId(req.params.id));
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

/** GET /user/:userId - Responds with the student profile linked to a user id. */
export const getStudentByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentsService.findByUserId(parseId(req.params.userId));
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

/** GET /lrn/:lrn - Responds with the student profile matching the given LRN. */
export const getStudentByLrn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const student = await studentsService.findByLrn(parseStringParam(req.params.lrn));
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

/** POST / - Creates a student and its linked user account, responding with 201. */
export const createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const payload = req.body as Student;
        const student = await studentsService.create(payload);
        res.status(201).json(student);
    } catch (error) {
        next(error);
    }
};

/** PATCH /:id - Applies the supplied fields to a student and responds with the update. */
export const updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const payload = req.body as StudentUpdate;
        const student = await studentsService.update(parseId(req.params.id), payload);
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

/** DELETE /:id - Removes a student and responds with 204 when successful. */
export const deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await studentsService.remove(parseId(req.params.id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
