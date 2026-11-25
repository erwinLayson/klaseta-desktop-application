import type { Pool } from "mysql2/promise";
import type { PublicUser, User, UserUpdate } from "../types/user.types.js";
declare class UsersService {
    private dbPool;
    constructor(dbPool: Pool);
    private withModel;
    private validateId;
    private validateCreate;
    private validateUpdate;
    create(user: User): Promise<PublicUser>;
    findAll(): Promise<PublicUser[]>;
    findById(id: number): Promise<PublicUser>;
    update(id: number, changes: UserUpdate): Promise<PublicUser>;
    remove(id: number): Promise<void>;
}
export declare const usersService: UsersService;
export default usersService;
//# sourceMappingURL=users.service.d.ts.map