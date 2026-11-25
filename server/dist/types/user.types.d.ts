export type User = {
    email: string;
    username: string;
    password: string;
};
export type PublicUser = {
    id: number;
    email: string;
    username: string;
};
export type UserRow = PublicUser & {
    password: string;
};
export type UserUpdate = {
    email?: string;
    username?: string;
    password?: string;
};
//# sourceMappingURL=user.types.d.ts.map