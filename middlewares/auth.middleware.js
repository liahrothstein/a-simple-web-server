import ApiError from "../exceptions/api.error.js"
import TokenService from "../services/token.service.js";


const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            next(ApiError.Unauthorized())
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            next(ApiError.Unauthorized())
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            next(ApiError.Forbidden())
        }

        req.user = userData;
        next()
    } catch (e) {
        next(ApiError.Forbidden())
    }
}

export default authMiddleware