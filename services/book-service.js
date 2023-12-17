import ApiError from "../exceptions/api-error.js";
import Book from "../models/book.js";

class BookService {
    async getBooks() {
        const books = await Book.find()
        return books
    }

    async getOneBook({ id }) {
        const book = await Book.findById(id);
        if (!book) {
            throw ApiError.NotFound('The book with this id was not found')
        }

        return book
    }

    async addBook(book) {
        const potentialBook = await Book.findOne(book);
        if (potentialBook) {
            throw ApiError.BadRequest('This book already exists')
        }

        const addedBook = await Book.create(book);
        return addedBook
    }

    async updateBook(initialBook) {
        const updatedBook = await Book.findByIdAndUpdate(initialBook._id, initialBook, { new: true });
        if (!updatedBook) {
            throw ApiError.NotFound('The book with this id was not found');
        }

        return updatedBook
    }

    async deleteBook({ id }) {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            throw ApiError.NotFound('The book with this id was not found');
        }

        return book
    }
}

export default new BookService()