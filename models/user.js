import mongoose from 'mongoose';

const User = mongoose.Schema({
    id: { type: Number, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
});

export default mongoose.model('User', User)