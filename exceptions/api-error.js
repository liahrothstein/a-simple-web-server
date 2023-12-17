class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static Unauthorized() {
        return new ApiError(401, 'Unauthorized')
    }

    static Forbidden() {
        return new ApiError(403, 'Forbidden')
    }

    static NotFound(message, errors = []) {
        return new ApiError(404, message, errors)
    }

    static MethodNotAllowed(message, errors = []) {
        return new ApiError(405, message, errors)
    }
}

export default ApiError