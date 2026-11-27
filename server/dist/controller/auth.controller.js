import * as authService from "../service/auth.service.js";
// Helper function to parse and validate the user payload
import { normalizeString } from "../helper/normalizeString.js";
/** POST /login - Authenticates credentials and attaches the user to the request. */
export const authLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.authLogin({
            email: normalizeString(email),
            password: String(password)
        });
        // initialize the session or token here if needed
        req.user = user;
        res.status(200).json({ msg: "Login successful", isVerified: true, user });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map