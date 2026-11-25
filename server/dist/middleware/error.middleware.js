import HttpError from "../types/http-error.js";
import RequestError from "../types/request-error.js";
import ServerError from "../types/server-error.js";
const errorMiddleware = (err, _req, res, _next) => {
    if (err instanceof RequestError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    if (err instanceof ServerError) {
        console.error(err.message, err.cause);
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    if (err instanceof HttpError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    const serverError = new ServerError(err instanceof Error ? err : new Error(String(err)));
    console.error(serverError.message, serverError.cause);
    res.status(serverError.statusCode).json({ error: serverError.message });
};
export default errorMiddleware;
//# sourceMappingURL=error.middleware.js.map