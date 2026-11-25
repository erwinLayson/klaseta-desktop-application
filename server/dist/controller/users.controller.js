import usersService from "../service/users.service.js";
const parseId = (value) => typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;
export const listUsers = async (_req, res, next) => {
    try {
        const users = await usersService.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
};
export const getUser = async (req, res, next) => {
    try {
        const user = await usersService.findById(parseId(req.params.id));
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
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
export const updateUser = async (req, res, next) => {
    try {
        const user = await usersService.update(parseId(req.params.id), req.body);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
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