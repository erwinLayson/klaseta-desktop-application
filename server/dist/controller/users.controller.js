import usersService from "../service/users.service.js";
/** Converts a route parameter string into a number, or `NaN` when it is missing. */
const parseId = (value) => typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;
/** GET / - Responds with the list of all users. */
export const listUsers = async (_req, res, next) => {
    try {
        const users = await usersService.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
};
/** GET /:id - Responds with a single user by id. */
export const getUser = async (req, res, next) => {
    try {
        const user = await usersService.findById(parseId(req.params.id));
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
/** POST / - Creates a user from the JSON request body and responds with 201. */
export const createUser = async (req, res, next) => {
    try {
        const payload = req.body;
        ;
        const user = await usersService.create({ ...payload, password: String(payload.password) });
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
};
/** PATCH /:id - Applies the supplied fields to a user and responds with the update. */
export const updateUser = async (req, res, next) => {
    try {
        const payload = req.body;
        const user = await usersService.update(parseId(req.params.id), payload);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
/** DELETE /:id - Removes a user and responds with 204 when successful. */
export const deleteUser = async (req, res, next) => {
    try {
        await usersService.remove(parseId(req.params.id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=users.controller.js.map