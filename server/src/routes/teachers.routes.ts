/** Teacher CRUD routes mounted at /api/teachers. */
import { Router } from "express";
import * as teachersController from "../controller/teachers.controller.js";

const router: Router = Router();

/** GET / - Lists all teachers. */
router.get("/", teachersController.listTeachers);
/** POST / - Creates a teacher profile for an existing user. */
router.post("/", teachersController.createTeacher);
/** GET /user/:userId - Retrieves the teacher profile for a given user id. */
router.get("/user/:userId", teachersController.getTeacherByUserId);
/** GET /:id - Retrieves a single teacher by id. */
router.get("/:id", teachersController.getTeacher);
/** PATCH /:id - Updates a teacher by id. */
router.patch("/:id", teachersController.updateTeacher);
/** DELETE /:id - Removes a teacher by id. */
router.delete("/:id", teachersController.deleteTeacher);

export default router;
