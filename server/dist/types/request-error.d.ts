import HttpError from "./http-error.js";
/** Error for malformed or invalid client input; responds with HTTP 400. */
declare class RequestError extends HttpError {
    /** @param message - Description of the invalid input. */
    constructor(message?: string);
}
export default RequestError;
//# sourceMappingURL=request-error.d.ts.map