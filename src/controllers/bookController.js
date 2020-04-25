const debug = require('debug')('app:bookRouter');

function controller(Book) {
    function booksGetIndex(req, res) {
        debug('serving books');
        const query = {};
        debug(req.query);
        if (req.query && req.query.author) {
            query.author = req.query.author;
        }

        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }
            const returnBooks = books.map((book) => {
                const newBook = book.toJSON();
                newBook.links = {};
                // eslint-disable-next-line no-underscore-dangle
                newBook.links.self = `http://${req.headers.host}/api/books/${newBook._id}`;
                return newBook;
            });
            return res.send(returnBooks);
        });
    }
    function booksCreate(req, res) {
        debug('creating new book');
        const book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            return res.send('Title is required');
        }
        book.save();
        res.status(201);
        return res.json(book);
    }
    function booksMiddleware(req, res, next) {
        debug('middleware: searching book by book id');
        const { bookId } = req.params;
        const query = { _id: bookId };
        Book.findById(query, (err, book) => {
            if (err) {
                return res.send(err);
            }
            if (book) {
                req.book = book;
                return next();
            }
            return res.sendStatus(404);
        });
    }
    function booksBetById(req, res) {
        debug('serving book');
        const returnBook = req.book.toJSON();
        returnBook.links = {};
        const author = req.book.author.replace(' ', '%20');
        returnBook.links.filterByAuthor = `http://${req.headers.host}/api/books/?author=${author}`;
        res.send(returnBook);
    }
    function booksPut(req, res) {
        debug('put:updating book by book id');
        const { book } = req;
        book.author = req.body.author;
        book.save((err) => {
            if (err) {
                return res.send(err);
            } return res.send(book);
        });
    }
    function booksPatch(req, res) {
        debug('patch:updating book by book id');
        const { book } = req;

        // eslint-disable-next-line no-underscore-dangle
        if (req.body._id) {
            // eslint-disable-next-line no-underscore-dangle
            delete req.body._id;
        }

        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            book[key] = value;
        });
        book.save((err) => {
            if (err) {
                return res.send(err);
            } return res.send(book);
        });
    }
    function bookDelete(req, res) {
        debug('deleting book by book id');
        const { book } = req;
        book.delete((err) => {
            if (err) {
                return res.send(err);
            } return res.send({ msg: 'Successfully delete book.' });
        });
    }
    return {
        booksGetIndex,
        booksCreate,
        booksMiddleware,
        booksBetById,
        booksPut,
        booksPatch,
        bookDelete,
    };
}

module.exports = controller;
