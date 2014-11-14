'use strict';
/* jshint maxlen: false */
/* jshint maxstatements: false */

require('../index');

var mongoose = require('mongoose');
var jar      = require('request').jar();
var request  = require('request').defaults({jar: jar});
var expect   = require('expect.js');
var config   = require('configly').config;

var baseUrl  = 'http://localhost:' + config.get('env.port');
var User, user, csrfToken;
var defaultUser = {
  email: 'test@email.com',
  password: 'testingtesting',
  role: 'admin'
};

// API endpoints :
//   /routes/v1/auth.js
//     POST   /v1/auth/login
//     ANY    /v1/auth/logout
//     GET    /v1/auth/roles
//     POST   /v1/auth/request-reset
//     POST   /v1/auth/reset-password
//   /routes/v1/user.js
//     GET    /v1/user
//     GET    /v1/user/:id
//     POST   /v1/user
//     PUT    /v1/user/:id
//     DELETE /v1/user/:id

describe('question tests', function () {

  before(function (done) {
    User = mongoose.model('User');
    User.defaultUser(defaultUser).then(function (theUser) {
      user = theUser;
      request.get(baseUrl, function (err, res, body) {
        csrfToken = jar.getCookies(baseUrl)[0].value;
        done();
      });
    });
  });

  after(function (done) {
    // Drop the test database after the test is done.
    mongoose.connection.db.dropDatabase(done);
  });

  describe('Level 1', function () {

    it('should be able to login', function (done) {
      request.post({
        url: baseUrl + '/v1/auth/login',
        json: {
          email: defaultUser.email,
          password: defaultUser.password,
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.user).to.be.an(Object);
        expect(body.user.id).to.be(user.id);
        user = body.user;
        done();
      });
    });

    it('should be able to create a question', function (done) {
      request.post({
        url: baseUrl + '/v1/question',
        json: {
          label: 'Test Question',
          question: 'What is a test question?',
          type: 'multipleChoice',
          choices: [
            { label: 'Simply put, a test question.', key: 'simply' },
            { label: 'It\'s complicated...', key: 'complicated' }
          ],
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.question).to.be.an(Object);
        expect(body.question.label).to.be('Test Question');
        done();
      });
    });

  });

  describe('Level 2', function (done) {



  });

});
