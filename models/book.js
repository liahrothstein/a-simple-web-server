import mongoose from 'mongoose';

const Book = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    issueYear: { type: String, required: true }
});

export default mongoose.model('Book', Book)