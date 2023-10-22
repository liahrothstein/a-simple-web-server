import Router from 'express';

import userController from '../controllers/user-controller.js';
import bookController from '../controllers/book-controller.js';

const router = new Router();

// endpoints
router.get('/books', bookController.getBooks);
router.post('/add-book', bookController.addBook);
router.put('/update-book', bookController.updateBook);
router.delete('/delete-book/:id', bookController.deleteBook);

router.get('/users', userController.getUsers);
router.post('/add-user', userController.addUser);
router.put('/update-user', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

export default router;