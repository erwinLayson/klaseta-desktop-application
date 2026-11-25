import HttpError from "./http-error.js";

class ServerError extends HttpError {
    readonly cause: Error;

    constructor(cause: Error, message: string = "Internal server error") {
        super(500, message, { cause });
        this.name = "ServerError";
        this.cause = cause;
    }
}

export default ServerError;
