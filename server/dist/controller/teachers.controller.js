import teachersService from "../service/teachers.service.js";
/** Converts a route parameter string into a number, or `NaN` when it is missing. */
const parseId = (value) => typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;
/** GET / - Responds with the list of all teachers. */
export const listTeachers = async (_req, res, next) => {
    try {
        const teachers = await teachersService.findAll();
        res.status(200).json(teachers);
    }
    catch (error) {
        next(error);
    }
};
/** GET /:id - Responds with a single teacher by id. */
export const getTeacher = async (req, res, next) => {
    try {
        const teacher = await teachersService.findById(parseId(req.params.id));
        res.status(200).json(teacher);
    }
    catch (error) {
        next(error);
    }
};
/** GET /user/:userId - Responds with the teacher profile linked to a user id. */
export const getTeacherByUserId = async (req, res, next) => {
    try {
        const teacher = await teachersService.findByUserId(parseId(req.params.userId));
        res.status(200).json(teacher);
    }
    catch (error) {
        next(error);
    }
};
/** POST / - Creates a teacher profile for an existing user and responds with 201. */
export const createTeacher = async (req, res, next) => {
    try {
        const payload = req.body;
        const teacher = await teachersService.create({ ...payload, userId: Number(payload.userId) });
        res.status(201).json(teacher);
    }
    catch (error) {
        next(error);
    }
};
/** PATCH /:id - Applies the supplied fields to a teacher and responds with the update. */
export const updateTeacher = async (req, res, next) => {
    try {
        const payload = req.body;
        const teacher = await teachersService.update(parseId(req.params.id), payload);
        res.status(200).json(teacher);
    }
    catch (error) {
        next(error);
    }
};
/** DELETE /:id - Removes a teacher and responds with 204 when successful. */
export const deleteTeacher = async (req, res, next) => {
    try {
        await teachersService.remove(parseId(req.params.id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=teachers.controller.js.map