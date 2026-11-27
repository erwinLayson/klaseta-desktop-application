/** User CRUD routes mounted at /api/users. */
import { Router } from "express";
import * as usersController from "../controller/users.controller.js";

const router: Router = Router();

/** GET / - Lists all users. */
router.get("/", usersController.listUsers);
/** POST / - Creates a new user. */
router.post("/", usersController.createUser);
/** GET /:id - Retrieves a single user by id. */
router.get("/:id", usersController.getUser);
/** PATCH /:id - Updates a user by id. */
router.patch("/:id", usersController.updateUser);
/** DELETE /:id - Removes a user by id. */
router.delete("/:id", usersController.deleteUser);

export default router;
