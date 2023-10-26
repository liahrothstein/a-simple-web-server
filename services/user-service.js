import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { check, validationResult } from 'express-validator';

import User from '../models/user.js';

class UserService {
    async validationUser(req) {
        const checkErrors = [
            check('password', 'Invalid password').isLength({ min: 8 }),
            check('phone', 'Invalid phone').isMobilePhone(['be-BY', 'ru-RU']),
            check('email', 'Invalid email').isEmail()
        ];

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new Error(errors)
        }

        return checkErrors
    }

    async addUser(user) {
        const { login, password, firstName, lastName, phone, email } = user;
        const isNewUser = await User.findOne({ login, email });
        if (!!isNewUser) {
            throw new Error(`400 User with username - ${login}, already exist`)
        };

        const hashPassword = await bcrypt.hash(password, 7);
        const addedUser = await User.create({ login, password: hashPassword, firstName, lastName, phone, email });

        return addedUser
    }

    async loginUser(authData) {
        const { login, password } = authData;
        const secretKey = config.get('secretKey');
        const user = await User.findOne({ login });
        if (!user) {
            throw new Error('404 User Not Found')
        }

        const passwordCompare = bcrypt.compareSync(password, user.password);
        if (!passwordCompare) {
            throw new Error('Password isn\'t correct')
        }

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
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