import { Router } from "express";
import * as usersController from "../controller/users.controller.js";

const router: Router = Router();

router.get("/", usersController.listUsers);
router.post("/", usersController.createUser);
router.get("/:id", usersController.getUser);
router.patch("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

export default router;
