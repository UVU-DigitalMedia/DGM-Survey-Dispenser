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
var testUser = {
  email: 'testUser@email.com',
  password: 'myPassword',
  role: 'user'
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

describe('user tests', function () {

  before(function (done) {
    User = mongoose.model('User');
    User.defaultUser(defaultUser).then(function (theUser) {
      user = theUser;
      request.get(baseUrl, function (err, res, body) {
        csrfToken = jar.getCookiesSync(baseUrl)[0].value;
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

    it('should be able to get the role information', function (done) {
      request.get(baseUrl + '/v1/auth/roles', function (err, res, body) {
        expect(err).to.be(null);
        body = JSON.parse(body);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.roles).to.be.eql(User.roles);
        expect(body.accessLevels).to.be.eql(User.accessLevels);
        done();
      });
    });

    it('should be able to create a user', function (done) {
      testUser._csrf = csrfToken;
      request.post({
        url: baseUrl + '/v1/user',
        json: testUser
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.user).to.be.an(Object);
        expect(body.user.email).to.be(testUser.email);
        expect(body.user.password).to.not.be(testUser.password);
        expect(body.user.role).to.be(testUser.role);
        testUser = body.user;
        done();
      });
    });

    it('should be able to read all of the users', function (done) {
      request.get(baseUrl + '/v1/user', function (err, res, body) {
        expect(err).to.be(null);
        body = JSON.parse(body);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.users).to.be.an(Array);
        expect(body.users).to.have.length(2);
        expect(body.users[0].email).to.be(user.email);
        expect(body.users[1].email).to.be(testUser.email);
        done();
      });
    });

    it('should be able to update a user', function (done) {
      request.put({
        url: baseUrl + '/v1/user/' + testUser.id,
        json: {
          role: 'admin',
          password: 'a different password',
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.user).to.be.an(Object);
        expect(body.user.id).to.be(testUser.id);
        expect(body.user.role).to.be('admin');
        expect(body.user.email).to.be(testUser.email);
        expect(body.user.updatedAt).to.be.greaterThan(testUser.updatedAt);
        testUser = body.user;
        done();
      });
    });

    it('should be able to update itself', function (done) {
      request.put({
        url: baseUrl + '/v1/user/' + user.id,
        json: {
          email: 'adifferentemail@email.com',
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.user).to.be.an(Object);
        expect(body.user.id).to.be(user.id);
        expect(body.user.role).to.be(user.role);
        expect(body.user.email).to.be('adifferentemail@email.com');
        expect(body.user.updatedAt).to.be.greaterThan(user.updatedAt);
        user = body.user;
        done();
      });
    });

    it('should be able to get itself as a user', function (done) {
      request.get(baseUrl + '/v1/user/' + user.id, function (err, res, body) {
        expect(err).to.be(null);
        body = JSON.parse(body);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.user).to.be.an(Object);
        expect(body.user.id).to.be(user.id);
        expect(body.user).to.be.eql(user);
        done();
      });
    });

    it('should be able to get other users', function (done) {
      request.get(baseUrl + '/v1/user/' + testUser.id, function (err, res, body) {
        expect(err).to.be(null);
        body = JSON.parse(body);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.user).to.be.an(Object);
        expect(body.user).to.be.eql(testUser);
        done();
      });
    });

    it('should be able to delete users', function (done) {
      request.del({
        url: baseUrl + '/v1/user/' + testUser.id,
        json: {
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);

        request.get(baseUrl + '/v1/user/' + testUser.id, function (err, res, body) {
          expect(err).to.be(null);
          body = JSON.parse(body);
          expect(body).to.be.an(Object);
          expect(body.success).to.be(false);
          expect(body.error).to.be('NOT FOUND');
          done();
        });
      });
    });

    it('should logout', function (done) {
      request.get(baseUrl + '/v1/auth/logout', function (err, res, body) {
        expect(err).to.be(null);
        body = JSON.parse(body);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        done();
      });
    });

  });

  describe('Level 2', function (done) {

    it('should get unauthorized for protected endpoint', function (done) {
      request.get(baseUrl + '/v1/user', function (err, res, body) {
        csrfToken = jar.getCookiesSync(baseUrl)[0].value;
        expect(err).to.be(null);
        body = JSON.parse(body);
        expect(res.statusCode).to.be(403);
        expect(body.success).to.be(false);
        expect(body.error).to.be('UNAUTHORIZED');
        done();
      });
    });

    it('should lock the account after 3 failed attempts', function (done) {
      // request.js should really have a promise version
      makeBadRequest(function (body) {
        expect(body.error).to.be('Incorrect Password');
        makeBadRequest(function (body) {
          expect(body.error).to.be('Incorrect Password');
          makeBadRequest(function (body) {
            expect(body.error).to.be('Incorrect Password');
            makeBadRequest(function (body) {
              expect(body.error).to.be('Max Attempts');
              done();
            });
          });
        });
      });

      function makeBadRequest(cb) {
        request.post({
          url: baseUrl + '/v1/auth/login',
          json: {
            email: user.email,
            password: defaultUser.password + '1',
            _csrf: csrfToken
          }
        }, function (err, res, body) {
          expect(err).to.be(null);
          expect(body.success).to.be(false);
          cb(body);
        });
      }
    });

    it('should be able to request a password reset and reset the password', function (done) {
      request.post({
        url: baseUrl + '/v1/auth/request-reset',
        json: {
          email: user.email,
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body.success).to.be(true);

        User.findById(user.id).exec().then(function (user) {
          request.post({
            url: baseUrl + '/v1/auth/reset-password',
            json: {
              token: user.token,
              email: user.email,
              password: defaultUser.password + '1',
              _csrf: csrfToken
            }
          }, function (err, res, body) {
            expect(err).to.be(null);
            expect(body.success).to.be(true);
            done();
          });
        }, done);
      });
    });

    it('should fail login with wrong email', function (done) {
      request.post({
        url: baseUrl + '/v1/auth/login',
        json: {
          email: '1' + user.email,
          password: defaultUser.password + '1',
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body.success).to.be(false);
        done();
      });
    });

    it('should login with new password', function (done) {
      request.post({
        url: baseUrl + '/v1/auth/login',
        json: {
          email: user.email,
          password: defaultUser.password + '1',
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body.success).to.be(true);
        expect(body.user.id).to.be(user.id);
        user = body.user;
        done();
      });
    });

  });

});
