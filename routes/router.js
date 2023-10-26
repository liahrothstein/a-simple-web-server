import Router from 'express';

import UserController from '../controllers/user-controller.js';
import BookController from '../controllers/book-controller.js';

const router = new Router();

// endpoints
router.get('/books', BookController.getBooks);
router.get('/book/:id', BookController.getOneBook);
router.post('/add-book', BookController.addBook);
router.put('/update-book', BookController.updateBook);
router.delete('/delete-book/:id', BookController.deleteBook);

router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getOneUser);
router.post('/registration', UserController.addUser);
router.post('/auth', UserController.loginUser);
router.put('/update-user', UserController.updateUser);
router.delete('/delete-user/:id', UserController.deleteUser);

export default router;