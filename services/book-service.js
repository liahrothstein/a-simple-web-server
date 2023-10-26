import Book from "../models/book.js";

class BookService {
    async getBooks() {
        const books = await Book.find()
        return books
    }

    async getOneBook({ id }) {
        const book = await Book.findById(id);
        return book
    }

    async addBook(book) {
        const addedBook = await Book.create(book);
        return addedBook
    }

    async updateBook(initialBook) {
        const updatedBook = await Book.findByIdAndUpdate(initialBook._id, initialBook, { new: true });
        return updatedBook
    }

    async deleteBook({ id }) {
        const book = await Book.findByIdAndDelete(id);
        return book
    }
}

export default new BookService()