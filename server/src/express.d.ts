import type { PublicUser } from "./types/user.types.js";

declare global {
    namespace Express {
        interface Request {
            user?: PublicUser;
        }
    }
}
