import HttpError from "./http-error.js";
class ServerError extends HttpError {
    cause;
    constructor(cause, message = "Internal server error") {
        super(500, message, { cause });
        this.name = "ServerError";
        this.cause = cause;
    }
}
export default ServerError;
//# sourceMappingURL=server-error.js.map