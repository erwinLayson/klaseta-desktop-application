import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import errorMiddleware from "../middleware/error.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import HttpError from "../types/http-error.js";
import RequestError from "../types/request-error.js";
import ServerError from "../types/server-error.js";

/** Creates mock Express Response object for testing */
function createMockResponse() {
    const res: Partial<Response> & { statusCode?: number; jsonData?: unknown } = {};
    res.status = function (code: number) {
        this.statusCode = code;
        return this as Response;
    };
    res.json = function (data: unknown) {
        this.jsonData = data;
        return this as Response;
    };
    return res as Response & { statusCode?: number; jsonData?: unknown };
}

describe("Middleware Unit Tests", () => {
    describe("errorMiddleware", () => {
        const mockReq = {} as Request;
        const mockNext: NextFunction = vi.fn();

        it("should format RequestError with status 400", () => {
            const res = createMockResponse();
            const error = new RequestError("Invalid email address");

            errorMiddleware(error, mockReq, res, mockNext);

            expect(res.statusCode).toBe(400);
            expect(res.jsonData).toEqual({ error: "Invalid email address" });
        });

        it("should format custom HttpError with its status code", () => {
            const res = createMockResponse();
            const error = new HttpError(404, "Resource not found");

            errorMiddleware(error, mockReq, res, mockNext);

            expect(res.statusCode).toBe(404);
            expect(res.jsonData).toEqual({ error: "Resource not found" });
        });

        it("should format ServerError with status 500", () => {
            const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
            const res = createMockResponse();
            const error = new ServerError(new Error("Database disconnected"));

            errorMiddleware(error, mockReq, res, mockNext);

            expect(res.statusCode).toBe(500);
            expect(res.jsonData).toEqual({ error: "Internal server error" });
            consoleSpy.mockRestore();
        });

        it("should handle unexpected non-HttpError by converting to status 500 ServerError", () => {
            const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
            const res = createMockResponse();
            const rawError = new Error("Unexpected crash");

            errorMiddleware(rawError, mockReq, res, mockNext);

            expect(res.statusCode).toBe(500);
            expect(res.jsonData).toEqual({ error: "Internal server error" });
            consoleSpy.mockRestore();
        });
    });

    describe("verifyToken", () => {
        const TEST_SECRET = "unit_test_jwt_secret";
        let originalSecret: string | undefined;

        beforeEach(() => {
            originalSecret = process.env.JWT_SECRET;
            process.env.JWT_SECRET = TEST_SECRET;
        });

        afterEach(() => {
            if (originalSecret !== undefined) {
                process.env.JWT_SECRET = originalSecret;
            } else {
                delete process.env.JWT_SECRET;
            }
        });

        it("should pass HttpError(401) to next if token cookie is missing", () => {
            const req = { cookies: {} } as Request;
            const res = createMockResponse();
            let nextError: unknown;

            verifyToken(req, res, ((err?: unknown) => {
                nextError = err;
            }) as NextFunction);

            expect(nextError).toBeInstanceOf(HttpError);
            expect((nextError as HttpError).statusCode).toBe(401);
            expect((nextError as HttpError).message).toBe("No token provided");
        });

        it("should pass HttpError(401) to next if token is empty string", () => {
            const req = { cookies: { token: "   " } } as unknown as Request;
            const res = createMockResponse();
            let nextError: unknown;

            verifyToken(req, res, ((err?: unknown) => {
                nextError = err;
            }) as NextFunction);

            expect(nextError).toBeInstanceOf(HttpError);
            expect((nextError as HttpError).statusCode).toBe(401);
            expect((nextError as HttpError).message).toBe("No token provided");
        });

        it("should pass HttpError(401) to next if token is invalid", () => {
            const req = { cookies: { token: "invalid.jwt.token" } } as unknown as Request;
            const res = createMockResponse();
            let nextError: unknown;

            verifyToken(req, res, ((err?: unknown) => {
                nextError = err;
            }) as NextFunction);

            expect(nextError).toBeInstanceOf(HttpError);
            expect((nextError as HttpError).statusCode).toBe(401);
            expect((nextError as HttpError).message).toBe("Invalid or expired token");
        });

        it("should decode token, attach user to req, and call next() without error", () => {
            const payload = {
                id: 1,
                username: "testuser",
                email: "test@example.com",
                role: "teacher" as const
            };
            const validToken = jwt.sign(payload, TEST_SECRET);
            const req = { cookies: { token: validToken } } as unknown as Request;
            const res = createMockResponse();
            const nextSpy = vi.fn();

            verifyToken(req, res, nextSpy as unknown as NextFunction);

            expect(nextSpy).toHaveBeenCalledWith();
            expect(req.user?.id).toBe(1);
            expect(req.user?.email).toBe("test@example.com");
            expect(req.user?.role).toBe("teacher");
        });
    });
});
