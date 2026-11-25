export class HttpError extends Error {
    statusCode;
    constructor(statusCode, message, options) {
        super(message, options);
        this.name = "HttpError";
        this.statusCode = statusCode;
    }
}
export default HttpError;
//# sourceMappingURL=http-error.js.map