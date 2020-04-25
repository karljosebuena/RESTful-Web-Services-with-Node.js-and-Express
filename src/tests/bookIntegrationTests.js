require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../../app');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book CRUD Test', () => {
    it('should allow to be posted and return author and _id', (done) => {
        const bookPost = {
            title: 'test book',
            author: 'karl',
        };

        agent.post('/api/books')
            .send(bookPost)
            .expect(201)
            .end((err, results) => {
                results.body.should.have.property('author');
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    });

    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
    });
});
