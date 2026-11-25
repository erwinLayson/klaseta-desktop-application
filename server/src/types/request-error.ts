import HttpError from "./http-error.js";

class RequestError extends HttpError {
    constructor(message: string = "Bad request") {
        super(400, message);
        this.name = "RequestError";
    }
}

export default RequestError;
