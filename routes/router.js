import Router from 'express';

import UserController from '../controllers/user.controller.js';
import BookController from '../controllers/book.controller.js';
import { registerValidation } from '../validation/register.validation.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = new Router();

// user endpoints
router.post('/registration', registerValidation, UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);
router.get('/user/:id', authMiddleware, UserController.getOneUser);
router.put('/update-user', authMiddleware, UserController.updateUser);
router.delete('/delete-user/:id', authMiddleware, UserController.deleteUser);

// book endpoints
router.get('/books', authMiddleware, BookController.getBooks);
router.get('/book/:id', authMiddleware, BookController.getOneBook);
router.post('/add-book', authMiddleware, BookController.addBook);
router.put('/update-book', authMiddleware, BookController.updateBook);
router.delete('/delete-book/:id', authMiddleware, BookController.deleteBook);

export default router;