import User from '../models/user.js';

class UserRepository {
    async createUser(user) {
        const newUser = await User.create(user)

        return newUser
    }

    async findOneUser(userData) {
        const theFoundUser = await User.findOne(userData)

        return theFoundUser
    }

    async findByIdUser(id) {
        const theFoundUser = await User.findById(id)

        return theFoundUser
    }

    async findUsers() {
        const users = await User.find()

        return users
    }

    async findByIdAndUpdateUser(id, initialUserData) {
        const updatedUser = await User.findByIdAndUpdate(id, initialUserData, { new: true })

        return updatedUser
    }

    async findByIdAndDeleteUser(id) {
        const deletedUser = await User.findByIdAndDelete(id)

        return deletedUser
    }
}

export default new UserRepository()