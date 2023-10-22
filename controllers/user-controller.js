import UserService from "../services/user-service.js";

class UserController {
    async addUser(req, res) {
        try {
            const user = await UserService.addUser(req.body);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.body);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await UserService.deleteUser(req.params);
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController()