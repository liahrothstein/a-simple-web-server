import ApiError from "../exceptions/api-error.js";
import BookRepository from "../repositories/book.repository.js";

class BookService {
    async getBooks() {
        const books = await BookRepository.findBooks()
        return books
    }

    async getOneBook({ id }) {
        const book = await BookRepository.findByIdBook(id);
        if (!book) {
            throw ApiError.NotFound('The book with this id was not found')
        }

        return book
    }

    async addBook(book) {
        const potentialBook = await BookRepository.findOneBook(book);
        if (potentialBook) {
            throw ApiError.BadRequest('This book already exists')
        }

        const addedBook = await BookRepository.createBook(book);
        return addedBook
    }

    async updateBook(initialBook) {
        const updatedBook = await BookRepository.findByIdAndUpdateBook(initialBook._id, initialBook, { new: true });
        if (!updatedBook) {
            throw ApiError.NotFound('The book with this id was not found');
        }

        return updatedBook
    }

    async deleteBook({ id }) {
        const book = await BookRepository.findByIdAndDeleteBook(id);
        if (!book) {
            throw ApiError.NotFound('The book with this id was not found');
        }

        return book
    }
}

export default new BookService()