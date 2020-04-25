const express = require('express');

const bookRouter = express.Router();
const bookController = require('../controllers/bookController');

function router(Book) {
    const {
        booksGetIndex,
        booksCreate,
        booksMiddleware,
        booksBetById,
        booksPut,
        booksPatch,
        bookDelete,
    } = bookController(Book);
    bookRouter.route('/books')
        .get(booksGetIndex)
        .post(booksCreate);

    bookRouter.route('/books/:bookId')
        .all(booksMiddleware)
        .get(booksBetById)
        .put(booksPut)
        .patch(booksPatch)
        .delete(bookDelete);
    return bookRouter;
}

module.exports = router;
