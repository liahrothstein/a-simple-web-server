import mongoose from 'mongoose';

const User = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String }
});

export default mongoose.model('User', User)