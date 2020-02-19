const mongoose = require('mongoose');
const Book = require('../model/book');

/**
 * GET /book route to retrieve all the books
 */
function getBooks(req, res) {
    // Query the DB and if no errors, send all the books
    const query = Book.find({});
    query.exec(function(err, books) {
        if(err) {
            res.send(err);
        }
        res.json(books);
    })
}

/**
 * POST /book to save a new book
 */
function postBook(req, res) {
    const newBook = new Book(req.body);
    console.log('here');
    console.log(req.body);
    newBook.save(function(err, book) {
        console.log('here1.5');
        console.log(err);
        if(err) {
            return res.send(err);
        }
        console.log('here2');
        return res.json({ message: "Book successfully added!", book });
    });
}

/**
 * DELETE /book/:id to delete a book given its id
 */
function deleteBook(req, res) {
    Book.remove({_id: req.params.id}, function(err, result) {
        res.json({ message: 'Book successfully deleted!', result});
    });
}

/*
 * GET /book/:id route to retrieve a book given its id.
 */
function getBook(req, res) {
    Book.findById(req.params.id, (err, book) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(book);
    });
}

/**
 * PUT /book/:id to update a book given its id
 */
function updateBook(req, res) {
    Book.findById({_id: req.params.id}, function(err, book) {
        if(err) {
            res.send(err);
        }
        Object.assing(book, req.body).save(function(err, book) {
            if(err) {
                res.send(err);
            }
            res.json({ message: 'Book updated!', book});
        });
    });
}

// export all the functions
module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };