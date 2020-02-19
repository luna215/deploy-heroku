const bookRouter = require('express').Router();
const book = require('./controllers/book.controller');

bookRouter.route('/book')
  .get(book.getBooks)
  .post(book.postBook);

bookRouter.route('/book/:id')
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

module.exports = {
    bookRouter
};