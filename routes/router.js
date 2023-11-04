import Router from 'express';

import UserController from '../controllers/user-controller.js';
import BookController from '../controllers/book-controller.js';
import { registerValidation } from '../validation/register-validation.js';

const router = new Router();

// user endpoints
router.post('/registration', registerValidation, UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.get('/refresh', UserController.refresh);
router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getOneUser);
router.put('/update-user', UserController.updateUser);
router.delete('/delete-user/:id', UserController.deleteUser);

// books endpoints
router.get('/books', BookController.getBooks);
router.get('/book/:id', BookController.getOneBook);
router.post('/add-book', BookController.addBook);
router.put('/update-book', BookController.updateBook);
router.delete('/delete-book/:id', BookController.deleteBook);

export default router;