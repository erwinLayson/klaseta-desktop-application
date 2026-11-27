import type { RequestHandler } from "express";
import HttpError from "../types/http-error.js";
import type { UserRole } from "../types/user.types.js";

/**
 * Restricts route access to users with one of the allowed roles.
 * Must be mounted after `verifyToken` has populated `req.user`.
 * Responds with 401 if unauthenticated, or 403 if the user's role is not allowed.
 *
 * @param roles - One or more roles (or role arrays) permitted to access the route.
 * @returns Express RequestHandler middleware.
 */
export const allowRoles = (roles: string[]): RequestHandler => {

    return (req, _res, next) => {
        if (!req.user) {
            next(new HttpError(401, "Authentication required"));
            return;
        }

        if (!roles.includes(req.user.role)) {
            next(new HttpError(403, "Access denied: insufficient permissions"));
            return;
        }

        next();
    };
};

export default allowRoles;
