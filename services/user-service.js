import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
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
            throw ApiError.BadRequest(`400 User with username - ${login}, already exist`)
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
        const secretKey = config.get('secretKey');
        const user = await User.findOne({ login });
        if (!user) {
            throw ApiError.BadRequest('404 User Not Found')
        }

        const passwordCompare = bcrypt.compareSync(password, user.password);
        if (!passwordCompare) {
            throw ApiError.BadRequest('Password isn\'t correct')
        }

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '15m' });
        return ({
            token, user: {
                id: user.id,
                login: user.login,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email
            }
        });
    }

    async logoutUser() {

    }

    async refresh() {

    }

    async getUsers() {
        const AllUsers = await User.find();
        return AllUsers
    }

    async getOneUser({ id }) {
        const user = await User.findById(id);
        return user
    }

    async updateUser(initialUser) {
        const updatedUser = await User.findByIdAndUpdate(initialUser._id, initialUser, { new: true });
        return updatedUser
    }

    async deleteUser({ id }) {
        const user = await User.findByIdAndDelete(id);
        return user
    }
}

export default new UserService()