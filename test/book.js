// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Book = require('../model/book');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require('./mock.server');
const should = chai.should();

chai.use(chaiHttp);

console.log('collection removed');
// Our parent block
describe('Books', () => {
    console.log('collection removed');
    beforeEach(function(done) {
        Book.remove({}, function(err) {
            console.log('collection removed');
            done();
        });
    });

    /**
     * Test the /GET route
     */
    describe('/GET book', function() {
        it('it should GET all the books', function(done) {
            chai.request(server)
                .get('/book')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                })
        });
    });


    /**
     * Test the /POST route
     */
    describe('/POST book', function() {
        it('it should not POST a book without pages field', function(done) {
            const book = {
                title: 'The Lord of the Rings',
                author: 'J.R.R Tolkien',
                year: 1954
            }
            chai.request(server)
                .post('/book')
                .send(book)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('it should POST a book', function(done) {
            const book = {
                title: 'The Lord of the Rings',
                author: 'J.R.R. Tolkien',
                year: 1954,
                pages: 1170
            };
            chai.request(server)
                .post('/book')
                .send(book)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully added!');
                    res.body.book.should.have.property('title');
                    res.body.book.should.have.property('author');
                    res.body.book.should.have.property('pages');
                    res.body.book.should.have.property('year');
                    done();
                });
        });
    })
});
