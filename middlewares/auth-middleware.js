import ApiError from "../exceptions/api-error.js"
import TokenService from "../services/token-service.js";


const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            next(ApiError.UnauthorizedUser())
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            next(ApiError.UnauthorizedUser())
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            next(ApiError.UnauthorizedUser())
        }

        req.user = userData;
        next()
    } catch (e) {
        next(ApiError.UnauthorizedUser())
    }
}

export default authMiddleware