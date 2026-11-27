import type { RequestHandler } from "express";
/**
 * Verifies the JWT stored in the `token` cookie and attaches its payload to `req.user`.
 * Responds with 401 when the cookie is missing, malformed, invalid, or expired.
 */
declare const verifyToken: RequestHandler;
export { verifyToken };
export default verifyToken;
//# sourceMappingURL=auth.middleware.d.ts.map