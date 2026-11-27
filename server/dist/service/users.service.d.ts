import type { Pool } from "mysql2/promise";
import type { PublicUser, User, UserUpdate } from "../types/user.types.js";
/** Business logic for users: validation, uniqueness checks, and password hashing. */
declare class UsersService {
    private dbPool;
    /** @param dbPool - Pool used to borrow a connection for each operation. */
    constructor(dbPool: Pool);
    /**
     * Runs a callback against a Users model, always releasing the connection afterwards.
     * @param callback - Work to perform with the model.
     */
    private withModel;
    /** Rejects ids that are not positive integers. */
    private validateId;
    /** Ensures email, username and password are present before creating a user. */
    private validateCreate;
    /** Ensures any supplied update fields are non-empty strings. */
    private validateUpdate;
    /**
     * Creates a user with a hashed password after checking email/username uniqueness.
     * @returns The created user without its password.
     */
    create(user: User): Promise<PublicUser>;
    /** Lists all users without password fields. */
    findAll(): Promise<PublicUser[]>;
    /**
     * Retrieves a user by id.
     * @throws HttpError 404 when the user does not exist.
     */
    findById(id: number): Promise<PublicUser>;
    /**
     * Applies validated changes to a user, rechecking uniqueness and hashing new passwords.
     * @returns The updated user without its password.
     */
    update(id: number, changes: UserUpdate): Promise<PublicUser>;
    /** Removes a user by id, throwing 404 when it does not exist. */
    remove(id: number): Promise<void>;
}
/** Shared service instance bound to the application connection pool. */
declare const usersService: UsersService;
export default usersService;
//# sourceMappingURL=users.service.d.ts.map