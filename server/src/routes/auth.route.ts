import * as authController from '../controller/auth.controller.js';
import { Router } from 'express';

const router: Router = Router();

router.post("/login", authController.authLogin);

export default router;