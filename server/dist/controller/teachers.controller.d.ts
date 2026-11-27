import type { NextFunction, Request, Response } from "express";
/** GET / - Responds with the list of all teachers. */
export declare const listTeachers: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
/** GET /:id - Responds with a single teacher by id. */
export declare const getTeacher: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/** GET /user/:userId - Responds with the teacher profile linked to a user id. */
export declare const getTeacherByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/** POST / - Creates a teacher profile for an existing user and responds with 201. */
export declare const createTeacher: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/** PATCH /:id - Applies the supplied fields to a teacher and responds with the update. */
export declare const updateTeacher: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/** DELETE /:id - Removes a teacher and responds with 204 when successful. */
export declare const deleteTeacher: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=teachers.controller.d.ts.map