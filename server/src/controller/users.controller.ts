import type { NextFunction, Request, Response } from "express";
import usersService from "../service/users.service.js";
import type { User, UserUpdate } from "../types/user.types.js";

const parseId = (value: unknown): number =>
    typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;

export const listUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await usersService.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await usersService.findById(parseId(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const payload = req.body as User;;
        const user = await usersService.create({...payload, password: String(payload.password)});
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await usersService.update(parseId(req.params.id), req.body as UserUpdate);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await usersService.remove(parseId(req.params.id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
