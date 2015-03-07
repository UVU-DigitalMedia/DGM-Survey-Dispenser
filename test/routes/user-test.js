'use strict';

var chai    = require('chai');
var User    = require('../../models/user');
var request = require('../test-helpers/request');
var app     = require('../test-helpers/app');
var expect  = chai.expect;

var url = '/api/v1/users';

describe(url, function () {

  var userInfo = {
    email: 'test@testemail.com',
    password: 'the-quick-brown-fox',
    role: 'admin'
  };

  before(function () {
    return app.init().then(function () {
      return User.create(userInfo);
    });
  });

  describe('authentication', function () {

    it('POST /login should log a user in', function () {
      return request.post(url + '/login')
        .auth(userInfo.email, userInfo.password)
        .expect(200)
        .then(function (res) {
          expect(res.body.id).to.eql(1);
          expect(res.body.role).to.eql('admin');
        });
    });

    it('POST /logout should log a user out', function () {
      return request.post(url + '/login')
        .auth(userInfo.email, userInfo.password)
        .expect(200)
        .then(function () {
          return request
            .post(url + '/logout')
            .expect(401);
        });
    });

  });

});
