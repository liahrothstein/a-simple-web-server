import User from '../models/user.js';

class UserService {
    async addUser(user) {
        const addedUser = await User.create(user);
        return addedUser
    }

    async getUsers() {
        const AllUsers = await User.find();
        return AllUsers
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