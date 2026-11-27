import HttpError from "./http-error.js";
/** Error for unexpected internal failures; responds with HTTP 500 and logs the cause. */
declare class ServerError extends HttpError {
    readonly cause: Error;
    /**
     * Wraps an unexpected error with a safe, generic client-facing message.
     * @param cause - The original error, kept for server-side logging.
     * @param message - Safe message returned to the client.
     */
    constructor(cause: Error, message?: string);
}
export default ServerError;
//# sourceMappingURL=server-error.d.ts.map