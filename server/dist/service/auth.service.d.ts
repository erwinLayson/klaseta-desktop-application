import type { User } from "../types/user.types.js";
/**
 * Authenticates a user by email and password.
 * @param userPayload - Email and plain-text password from the login request.
 * @returns The authenticated user without its password hash.
 * @throws HttpError 401 when the email is unknown or the password does not match.
 */
export declare const authLogin: (userPayload: Omit<User, "id" | "role" | "username">) => Promise<{
    id: number;
    email: string;
    username: string;
    role: import("../types/user.types.js").UserRole;
}>;
//# sourceMappingURL=auth.service.d.ts.map