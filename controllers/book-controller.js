import BookService from "../services/book-service.js";

class BookController {
    async getBooks(req, res) {
        try {
            const books = await BookService.getBooks();
            res.status(200).json(books)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getOneBook(req, res) {
        try {
            const book = await BookService.getOneBook(req.params);
            res.status(200).json(book)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async addBook(req, res) {
        try {
            const book = await BookService.addBook(req.body);
            res.status(201).json(book)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async updateBook(req, res) {
        try {
            const updatedBook = await BookService.updateBook(req.body);
            res.status(200).json(updatedBook)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async deleteBook(req, res) {
        try {
            const book = await BookService.deleteBook(req.params);
            res.status(200).json(book)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new BookController()