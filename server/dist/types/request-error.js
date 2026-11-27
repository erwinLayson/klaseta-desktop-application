import HttpError from "./http-error.js";
/** Error for malformed or invalid client input; responds with HTTP 400. */
class RequestError extends HttpError {
    /** @param message - Description of the invalid input. */
    constructor(message = "Bad request") {
        super(400, message);
        this.name = "RequestError";
    }
}
export default RequestError;
//# sourceMappingURL=request-error.js.map