/** Base application error that carries an HTTP status code for the error middleware. */
export class HttpError extends Error {
    statusCode;
    /**
     * Creates an error with the status code that should be sent to the client.
     * @param statusCode - HTTP status code for the response.
     * @param message - Human-readable description of the failure.
     * @param options - Standard Error options, such as `cause`.
     */
    constructor(statusCode, message, options) {
        super(message, options);
        this.name = "HttpError";
        this.statusCode = statusCode;
    }
}
export default HttpError;
//# sourceMappingURL=http-error.js.map