import type { NextFunction, Request, Response } from "express";
import teachersService from "../service/teachers.service.js";
import type { Teacher, TeacherUpdate } from "../types/teacher.types.js";

/** Converts a route parameter string into a number, or `NaN` when it is missing. */
const parseId = (value: unknown): number =>
    typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;

/** GET / - Responds with the list of all teachers. */
export const listTeachers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const teachers = await teachersService.findAll();
        res.status(200).json(teachers);
    } catch (error) {
        next(error);
    }
};

/** GET /:id - Responds with a single teacher by id. */
export const getTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const teacher = await teachersService.findById(parseId(req.params.id));
        res.status(200).json(teacher);
    } catch (error) {
        next(error);
    }
};

/** GET /user/:userId - Responds with the teacher profile linked to a user id. */
export const getTeacherByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const teacher = await teachersService.findByUserId(parseId(req.params.userId));
        res.status(200).json(teacher);
    } catch (error) {
        next(error);
    }
};

/** POST / - Creates a teacher and its linked user account, responding with 201. */
export const createTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const payload = req.body as Teacher;
        const teacher = await teachersService.create(payload);
        res.status(201).json(teacher);
    } catch (error) {
        next(error);
    }
};

/** PATCH /:id - Applies the supplied fields to a teacher and responds with the update. */
export const updateTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const payload = req.body as TeacherUpdate;
        const teacher = await teachersService.update(parseId(req.params.id), payload);
        res.status(200).json(teacher);
    } catch (error) {
        next(error);
    }
};

/** DELETE /:id - Removes a teacher and responds with 204 when successful. */
export const deleteTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await teachersService.remove(parseId(req.params.id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
