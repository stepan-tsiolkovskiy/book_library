import express from 'express';
import * as bookController from '../controllers/book.controller.js';
import uploadMiddleware from '../../middleware/multerMiddleware.js';

const router = express.Router();

router.get('/books', bookController.getAllController);

router.get('/books/:id', bookController.getByIdController);

router.post(
  '/books',
  express.json(),
  uploadMiddleware,
  bookController.createBookController
);

router.put('/books/:id', express.json(), bookController.updateBookController);

router.delete('/books/:id', bookController.deleteBookController);

export default router;
