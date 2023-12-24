import jwt from 'jsonwebtoken';

import Token from '../models/token.js';

class TokenService {
    async generateTokens(payload) {
        const SECRET_KEY = process.env.SECRET_KEY;
        const REFRESH_KEY = process.env.REFRESH_KEY;

        const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, REFRESH_KEY, { expiresIn: '30d' });
        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken) {
        const TokenData = await Token.findOne({ userId });
        if (TokenData) {
            TokenData.refreshToken = refreshToken;
            return TokenData.save()
        };

        const token = await Token.create({ user: userId, refreshToken });
        return token
    }

    async deleteToken(refreshToken) {
        const tokenData = await Token.findOneAndDelete(refreshToken);
        return tokenData
    }

    validateAccessToken(token) {
        try {
            const ACCESS_SECRET_KEY = process.env.SECRET_KEY;
            const userData = jwt.verify(token, ACCESS_SECRET_KEY);
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const REFRESH_SECRET_KEY = process.env.REFRESH_KEY;
            const userData = jwt.verify(token.refreshToken, REFRESH_SECRET_KEY);
            return userData
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken) {
        const token = await Token.findOne(refreshToken);
        return token
    }
}

export default new TokenService()