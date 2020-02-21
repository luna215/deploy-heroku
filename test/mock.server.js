const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { bookRouter } = require('../book.routes');
const devServer = express();
const port = 3000;

mongoose.connect(`mongodb://localhost/27018`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
if(!db) {
  console.log('Error connecting db');
} else {
  console.log('Db connected successfully');
}

devServer.use(bodyParser.json());
devServer.use(bodyParser.urlencoded(({extended: true})));
devServer.use(bodyParser.text());
devServer.use(bodyParser.json({ type: 'application/json'}));

devServer.use(bookRouter);

devServer.get('/', function(req, res) {
  res.json({ message: 'Welcome to our Bookstore!'});
});

devServer.listen(process.env.port || port);

module.exports = devServer; // for testing