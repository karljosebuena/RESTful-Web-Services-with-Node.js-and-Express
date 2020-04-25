const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const debug = require('debug')('app');
const connection = require('./src/configs/connection');
const Book = require('./src/models/bookModel');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.json());

const bookRouter = require('./src/routes/bookRouter')(Book);

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('hello there!');
});

app.server = app.listen(port, () => { debug(`Running on port ${port}`); });

module.exports = app;
