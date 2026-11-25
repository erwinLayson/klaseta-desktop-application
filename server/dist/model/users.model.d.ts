import type { PoolConnection } from "mysql2/promise";
import type { PublicUser, User, UserRow, UserUpdate } from "../types/user.types.js";
declare class Users {
    private connection;
    constructor(connection: PoolConnection);
    createUser(user: User): Promise<number>;
    findAll(): Promise<PublicUser[]>;
    findById(id: number): Promise<PublicUser | null>;
    findByEmail(email: string): Promise<UserRow | null>;
    findByUsername(username: string): Promise<UserRow | null>;
    updateById(id: number, changes: UserUpdate): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
}
export default Users;
//# sourceMappingURL=users.model.d.ts.map