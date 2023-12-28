import Book from '../models/book.js'

class BookRepository {
    async findBooks() {
        const books = await Book.find()

        return books
    }

    async findByIdBook(id) {
        const theFoundBook = await Book.findById(id)

        return theFoundBook
    }

    async findOneBook(book) {
        const theFoundBook = await Book.findOne(book)

        return theFoundBook
    }

    async createBook(book) {
        const createdBook = await Book.create(book)

        return createdBook
    }

    async findByIdAndUpdateBook(id, initialBookData) {
        const updatedBook = await Book.findByIdAndUpdate(id, initialBookData, { new: true })

        return updatedBook
    }

    async findByIdAndDeleteBook(id) {
        const deletedBook = await Book.findByIdAndDelete(id)

        return deletedBook
    }
}

export default new BookRepository()