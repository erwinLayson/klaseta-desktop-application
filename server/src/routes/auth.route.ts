/** Authentication routes mounted at /api/auth/users. */
import * as authController from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { Router } from 'express';

const router: Router = Router();

/** POST /login - Authenticates a user by email and password. */
router.post("/login", authController.authLogin);
/** GET /me - Responds with the currently authenticated user. */
router.get("/me", verifyToken, authController.authMe);
/** POST /logout - Clears the login session cookie. */
router.post("/logout", authController.authLogout);

export default router;
