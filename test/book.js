// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Book = require('../model/book');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require('../app');
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

});