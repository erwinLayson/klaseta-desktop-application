/** Authentication routes mounted at /api/auth/users. */
import * as authController from '../controller/auth.controller.js';
import { Router } from 'express';

const router: Router = Router();

/** POST /login - Authenticates a user by email and password. */
router.post("/login", authController.authLogin);

export default router;
