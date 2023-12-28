import Token from '../models/token.js'

class TokenRepository {
    async findOneToken(payload) {
        const theFoundToken = await Token.findOne(payload)

        return theFoundToken
    }

    async createToken(tokenData) {
        const createdToken = await Token.create(tokenData)

        return createdToken
    }

    async findOneAndDeleteToken(token) {
        const deletedToken = await Token.findOneAndDelete(token)

        return deletedToken
    }
}

export default new TokenRepository()