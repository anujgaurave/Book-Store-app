import express from 'express';
import {getSingleBookController, addBookController, getBooksController, updateBookController, deleteBookController } from '../Controllers/book.controller.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const bookRoute = express.Router();

bookRoute.post('/addbook', authMiddleware, addBookController);
bookRoute.get('/getallbooks',authMiddleware, getBooksController);
bookRoute.put('/updatebook',authMiddleware, updateBookController);
bookRoute.delete('/deleteBook',authMiddleware, deleteBookController);
bookRoute.get('/book',authMiddleware, getSingleBookController);

export default bookRoute;
