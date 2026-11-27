/** Credentials and profile data supplied when registering a new user. */
export type User = {
    email: string;
    username: string;
    password: string;
    role: UserRole;
};

/** User fields that are safe to return to API clients (password excluded). */
export type PublicUser = {
    id: number;
    email: string;
    username: string;
    role: UserRole;
};

/** Stored user record including the hashed password, used by authentication. */
export type UserRow = PublicUser & {
    password: string;
};

/** Partial set of user fields that may be changed by an update request. */
export type UserUpdate = {
    email?: string;
    username?: string;
    password?: string;
    role?: UserRole;
};

/** Constant values for the account roles a user can have. */
export const userRoles = {
    STUDENT: "student",
    TEACHER: "teacher",
} as const;

/** Union of all values declared in {@link userRoles}. */
export type UserRole = typeof userRoles[keyof typeof userRoles];
