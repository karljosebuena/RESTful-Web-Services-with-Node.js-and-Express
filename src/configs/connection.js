const mongoose = require('mongoose');
const debug = require('debug')('app:connectionConfig');

function connect() {
    const uri = process.env.ENV !== 'Test' ? 'mongodb://localhost/booksAPI' : 'mongodb://localhost/booksAPI_Test';
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: false })
    .then((response) => {
        debug('Connected to mongodb server.');
        if (process.env.ENV !== 'Test') {
            debug('Running on development database');
        } else {
            debug('Running on test database');
        }
    })
    .catch((err) => debug(err));
}

module.exports = connect();
