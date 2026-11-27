import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import HttpError from "../types/http-error.js";
import isValidEnv from "../helper/isValidEnv.js";
import type { PublicUser } from "../types/user.types.js";

/**
 * Verifies the JWT stored in the `token` cookie and attaches its payload to `req.user`.
 * Responds with 401 when the cookie is missing, malformed, invalid, or expired.
 */
export const verifyToken: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.token;

  if (typeof token !== "string" || token.trim() === "") {
    next(new HttpError(401, "No token provided"));
    return;
  }

  const secret = isValidEnv("JWT_SECRET");

  try {
    const decoded = jwt.verify(token, secret) as PublicUser;
    req.user = decoded;
    next();
  } catch (error) {
    next(new HttpError(401, "Invalid or expired token", {
      cause: error instanceof Error ? error : new Error(String(error)),
    }));
  }
};
