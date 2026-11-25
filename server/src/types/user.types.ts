export type User = {
    email: string;
    username: string;
    password: string;
    role: UserRole;
};

export type PublicUser = {
    id: number;
    email: string;
    username: string;
    role: UserRole;
};

export type UserRow = PublicUser & {
    password: string;
};

export type UserUpdate = {
    email?: string;
    username?: string;
    password?: string;
    role?: UserRole;
};

export const userRoles = {
    STUDENT: "student",
    TEACHER: "teacher",
} as const;

export type UserRole = typeof userRoles[keyof typeof userRoles];