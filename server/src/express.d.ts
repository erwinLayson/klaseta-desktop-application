/** Extends Express types so handlers can attach the authenticated user to a request. */
import type { PublicUser } from "./types/user.types.js";

declare global {
    namespace Express {
        interface Request {
            user?: PublicUser;
        }
    }
}
