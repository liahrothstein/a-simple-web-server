import { validationResult } from "express-validator";

import UserService from "../services/user.service.js";
import ApiError from "../exceptions/api.error.js";

class UserController {
    async registerUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', errors.array()))
            };

            const user = await UserService.registerUser(req.body);
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;
            res.cookie('refreshToken', user.refreshToken, { maxAge: thirtyDays, httpOnly: true, secure: true });
            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    async loginUser(req, res, next) {
        try {
            const userAndToken = await UserService.loginUser(req.body);
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;
            res.cookie('refreshToken', userAndToken.refreshToken, { maxAge: thirtyDays, httpOnly: true, secure: true });
            res.status(200).json(userAndToken)
        } catch (e) {
            next(e)
        }
    }

    async logoutUser(req, res, next) {
        try {
            const token = await UserService.logoutUser(req.cookies);
            res.clearCookie('refreshToken');
            res.status(200).json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const userAndToken = await UserService.refresh(req.cookies);
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;
            res.cookie('refreshToken', userAndToken.refreshToken, { maxAge: thirtyDays, httpOnly: true, secure: true });
            res.status(200).json(userAndToken)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }

    async getOneUser(req, res, next) {
        try {
            const user = await UserService.getOneUser(req.params);
            res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = await UserService.updateUser(req.body);
            res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await UserService.deleteUser(req.params);
            res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()