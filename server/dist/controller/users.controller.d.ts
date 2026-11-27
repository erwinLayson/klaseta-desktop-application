import type { NextFunction, Request, Response } from "express";
/** GET / - Responds with the list of all users. */
export declare const listUsers: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
/** GET /:id - Responds with a single user by id. */
export declare const getUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/** POST / - Creates a user from the JSON request body and responds with 201. */
export declare const createUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/** PATCH /:id - Applies the supplied fields to a user and responds with the update. */
export declare const updateUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/** DELETE /:id - Removes a user and responds with 204 when successful. */
export declare const deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=users.controller.d.ts.map