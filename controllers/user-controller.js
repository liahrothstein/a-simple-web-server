import { validationResult } from "express-validator";

import UserService from "../services/user-service.js";

class UserController {
    async registerUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json(errors)
            };

            const user = await UserService.registerUser(req.body);
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;
            res.cookie('refreshToken', user.refreshToken, { maxAge: thirtyDays, httpOnly: true, secure: true });
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async loginUser(req, res) {
        try {
            const userAndToken = await UserService.loginUser(req.body);
            res.status(200).json(userAndToken)
        } catch (e) {
            req.status(500).json(e.message)
        }
    }

    async logoutUser(req, res) {
        try {

        } catch (e) {
            req.status(500).json(e.message)
        }
    }

    async refresh(req, res) {
        try {

        } catch (e) {
            req.status(500).json(e.message)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getOneUser(req, res) {
        try {
            const user = await UserService.getOneUser(req.params);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.body);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UserService.deleteUser(req.params);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new UserController()