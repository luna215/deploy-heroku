require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { bookRouter } = require('./book.routes');
const app = express();
const port = 8080;

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-xbk8i.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose.connect(`mongodb://localhost/27018`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

const db = mongoose.connection;
if(!db) {
  console.log('Error connecting db');
} else {
  console.log('Db connected successfully');
}

app.use(morgan('combined'));

// parse application/josn and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(({extended: true})));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.use(bookRouter);

app.get('/', function(req, res) {
  res.json({ message: 'Welcome to our Bookstore!'});
});

app.listen(process.env.port || port);