import HttpError from "./http-error.js";
declare class ServerError extends HttpError {
    readonly cause: Error;
    constructor(cause: Error, message?: string);
}
export default ServerError;
//# sourceMappingURL=server-error.d.ts.map