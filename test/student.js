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
var testUvid = '10000000';

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

describe('student tests', function () {

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

    it('should login as student', function (done) {
      request.post({
        url: baseUrl + '/v1/student/' + testUvid + '/login',
        json: {
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.student).to.be.an(Object);
        expect(body.student.uvid).to.be(testUvid);
        done();
      });
    });

    it('should get currently logged in student', function (done) {
      request.get(baseUrl + '/v1/student/current', function (err, res, body) {
        expect(err).to.be(null);
        body = JSON.parse(body);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.student).to.be.an(Object);
        expect(body.student.uvid).to.be(testUvid);
        done();
      });
    });

    var qid;
    it('should create questions before answering them', function (done) {
      request.post({
        url: baseUrl + '/v1/question',
        json: {
          _csrf: csrfToken,
          label: 'Student Preference',
          question: 'What is your preference?',
          type: 'multipleChoice',
          choices: [
            { key: 'angular', label: 'AngularJS' },
            { key: 'react', label: 'React' },
            { key: 'ember', label: 'Ember' },
            { key: 'other', other: true, label: 'Other' }
          ]
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.question).to.be.an(Object);
        expect(body.question.label).to.be('Student Preference');
        qid = body.question._id;
        done();
      });
    });

    it('should be able to answer questions', function (done) {
      request.post({
        url: baseUrl + '/v1/student/answer/' + qid,
        json: {
          _csrf: csrfToken,
          value: {
            key: 'angular'
          }
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.answer).to.be.an(Object);
        console.log(body);
        done();
      });
    });

    it('should be able to answer questions', function (done) {
      request.post({
        url: baseUrl + '/v1/student/answer/' + qid,
        json: {
          _csrf: csrfToken,
          value: {
            key: 'other',
            value: 'None'
          }
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.answer).to.be.an(Object);
        console.log(body);
        done();
      });
    });

    it('should be able to logout', function (done) {
      request.post({
        url: baseUrl + '/v1/student/logout',
        json: {
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);

        request.get(baseUrl + '/v1/student/current', function (err, res, body) {
          expect(err).to.be(null);
          body = JSON.parse(body);
          expect(body).to.be.an(Object);
          expect(body.success).to.be(false);
          expect(body.student).to.be(undefined);
          done();
        });

      });
    });

    it('should allow admins to get list of students', function (done) {
      request.get(baseUrl + '/v1/student/', function (err, res, body) {
        expect(err).to.be(null);
        body = JSON.parse(body);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);
        expect(body.students).to.be.an(Array);
        expect(body.students.length).to.be(1);
        expect(body.students[0].uvid).to.be(testUvid);
        done();
      });
    });

    it('should delete a student', function (done) {
      request.del({
        url: baseUrl + '/v1/student/' + testUvid,
        json: {
          _csrf: csrfToken
        }
      }, function (err, res, body) {
        expect(err).to.be(null);
        expect(body).to.be.an(Object);
        expect(body.success).to.be(true);

        request.get(baseUrl + '/v1/student/', function (err, res, body) {
          expect(err).to.be(null);
          body = JSON.parse(body);
          expect(body).to.be.an(Object);
          expect(body.success).to.be(true);
          expect(body.students).to.be.an(Array);
          expect(body.students.length).to.be(0);
          done();
        });

      });
    });

  });

  describe('Level 2', function (done) {



  });

});
