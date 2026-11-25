import { pool } from "../database/database.conn.js";
import HttpError from "../types/http-error.js";
import RequestError from "../types/request-error.js";
import ServerError from "../types/server-error.js";
import Users from "../model/users.model.js";
import bcyrpt from "bcrypt";
import { isNonEmptyString } from "../helper/isNonEmptyString.js";
class UsersService {
    dbPool;
    constructor(dbPool) {
        this.dbPool = dbPool;
    }
    async withModel(callback) {
        const connection = await this.dbPool.getConnection();
        try {
            return await callback(new Users(connection));
        }
        finally {
            connection.release();
        }
    }
    validateId(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new RequestError("Invalid user id");
        }
    }
    validateCreate(user) {
        if (!isNonEmptyString(user?.email) || !isNonEmptyString(user?.username) || !isNonEmptyString(user?.password)) {
            throw new RequestError("email, username and password are required");
        }
    }
    validateUpdate(changes) {
        if ((changes.email !== undefined && !isNonEmptyString(changes.email)) ||
            (changes.username !== undefined && !isNonEmptyString(changes.username)) ||
            (changes.password !== undefined && !isNonEmptyString(changes.password))) {
            throw new RequestError("Provided fields must be non-empty strings");
        }
    }
    async create(user) {
        this.validateCreate(user);
        return this.withModel(async (users) => {
            if (await users.findByEmail(user.email)) {
                throw new HttpError(409, "A user with this email already exists");
            }
            if (await users.findByUsername(user.username)) {
                throw new HttpError(409, "A user with this username already exists");
            }
            const hashPassword = await bcyrpt.hash(user.password, 10);
            const id = await users.createUser({ ...user, password: hashPassword });
            const created = await users.findById(id);
            if (!created) {
                throw new ServerError(new Error(`User ${id} was not found after insert`), "Failed to retrieve the created user");
            }
            return created;
        });
    }
    async findAll() {
        return this.withModel((users) => users.findAll());
    }
    async findById(id) {
        this.validateId(id);
        const user = await this.withModel((users) => users.findById(id));
        if (!user) {
            throw new HttpError(404, "User not found");
        }
        return user;
    }
    async update(id, changes) {
        this.validateId(id);
        this.validateUpdate(changes);
        return this.withModel(async (users) => {
            if (!(await users.findById(id))) {
                throw new HttpError(404, "User not found");
            }
            if (changes.email !== undefined) {
                const existing = await users.findByEmail(changes.email);
                if (existing && existing.id !== id) {
                    throw new HttpError(409, "A user with this email already exists");
                }
            }
            if (changes.username !== undefined) {
                const existing = await users.findByUsername(changes.username);
                if (existing && existing.id !== id) {
                    throw new HttpError(409, "A user with this username already exists");
                }
            }
            await users.updateById(id, changes);
            const updated = await users.findById(id);
            if (!updated) {
                throw new ServerError(new Error(`User ${id} was not found after update`), "Failed to retrieve the updated user");
            }
            return updated;
        });
    }
    async remove(id) {
        this.validateId(id);
        await this.withModel(async (users) => {
            if (!(await users.findById(id))) {
                throw new HttpError(404, "User not found");
            }
            await users.deleteById(id);
        });
    }
}
const usersService = new UsersService(pool);
export default usersService;
//# sourceMappingURL=users.service.js.map