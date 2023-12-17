import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

import User from '../models/user.js';
import UserDto from '../dtos/user-dto.js';
import TokenService from './token-service.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
    async registerUser(user) {
        const { login, password, firstName, lastName, phone, email } = user;
        const candidate = await User.findOne({ login, email });
        if (candidate) {
            throw ApiError.BadRequest(`User with username - ${login}, already exist`)
        };

        const hashPassword = await bcrypt.hash(password, 7);
        const activationLink = v4();

        const addedUser = await User.create({ login, password: hashPassword, firstName, lastName, phone, email, activationLink });

        const userDto = new UserDto(addedUser);
        const tokens = await TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async loginUser(authData) {
        const { login, password } = authData;
        const user = await User.findOne({ login });
        if (!user) {
            throw ApiError.NotFound('User Not Found')
        }

        const passwordCompare = bcrypt.compareSync(password, user.password);
        if (!passwordCompare) {
            throw ApiError.BadRequest('Password isn\'t correct')
        }

        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async logoutUser(refreshToken) {
        const token = await TokenService.deleteToken(refreshToken);
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized()
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            throw ApiError.Forbidden()
        }

        const tokenFromDB = await TokenService.findToken(refreshToken);
        if (!tokenFromDB) {
            throw ApiError.Unauthorized()
        }

        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async getUsers() {
        const AllUsers = await User.find();
        return AllUsers
    }

    async getOneUser({ id }) {
        const user = await User.findById(id);
        if (!user) {
            throw ApiError.NotFound('The user with this id was not found')
        }

        return user
    }

    async updateUser(initialUser) {
        const updatedUser = await User.findByIdAndUpdate(initialUser._id, initialUser, { new: true });
        if (!updatedUser) {
            throw ApiError.NotFound('The user with this id was not found')
        }

        return updatedUser
    }

    async deleteUser({ id }) {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw ApiError.NotFound('The user with this id was not found')
        }

        return user
    }
}

export default new UserService()