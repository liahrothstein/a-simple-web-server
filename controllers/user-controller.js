import UserService from "../services/user-service.js";

class UserController {
    async validationUser(req, res) {
        try {
            const checkErrors = await UserService.validationUser(req);
            return checkErrors
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async addUser(req, res) {
        try {
            await UserService.validationUser(req);
            const user = await UserService.addUser(req.body);
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