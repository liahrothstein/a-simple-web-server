import jwt from 'jsonwebtoken';
import config from 'config';

import Token from '../models/token.js';

class TokenService {
    async generateTokens(payload) {
        const secretKey = config.get('secretKey');
        const refreshKey = config.get('refreshKey');

        const accessToken = jwt.sign(payload, secretKey, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: '30d' });
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
            const accessSecretKey = config.get('secretKey');
            const userData = jwt.verify(token, accessSecretKey);
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const refreshSecretKey = config.get('refreshKey');
            const userData = jwt.verify(token.refreshToken, refreshSecretKey);
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