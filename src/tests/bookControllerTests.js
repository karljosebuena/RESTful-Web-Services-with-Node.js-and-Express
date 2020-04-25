const should = require('should');
const sinon = require('sinon');
const bookdControlller = require('../controllers/bookController');

describe('Book Controller Tests', () => {
    describe('POST:booksCreate', () => {
        it('should not allow empty description on the request', () => {
            const Book = function (book) {
                this.save = () => {};
            };

            const req = {
                body: {
                    author: 'karl jose buena',
                },
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy(),
            };

            const controller = bookdControlller(Book);
            controller.booksCreate(req, res);

            res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});
