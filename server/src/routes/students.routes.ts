/** Student CRUD routes mounted at /api/students. */
import { Router } from "express";
import * as studentsController from "../controller/students.controller.js";

const router: Router = Router();

/** GET / - Lists all students. */
router.get("/", studentsController.listStudents);
/** POST / - Creates a student profile and linked user account. */
router.post("/", studentsController.createStudent);
/** GET /user/:userId - Retrieves the student profile for a given user id. */
router.get("/user/:userId", studentsController.getStudentByUserId);
/** GET /lrn/:lrn - Retrieves the student profile for a given LRN. */
router.get("/lrn/:lrn", studentsController.getStudentByLrn);
/** GET /:id - Retrieves a single student by id. */
router.get("/:id", studentsController.getStudent);
/** PATCH /:id - Updates a student by id. */
router.patch("/:id", studentsController.updateStudent);
/** DELETE /:id - Removes a student by id. */
router.delete("/:id", studentsController.deleteStudent);

export default router;
