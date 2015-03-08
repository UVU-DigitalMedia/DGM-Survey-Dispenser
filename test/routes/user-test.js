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

  it('GET / should get list of users', function () {
    return request.get(url)
      .auth(userInfo.email, userInfo.password)
      .expect(200)
      .expect([{
        email: userInfo.email,
        role: userInfo.role,
        id: 1
      }]);
  });

  it('POST / should create new user', function () {
    return request.post(url)
      .auth(userInfo.email, userInfo.password)
      .send({
        email: 'test2@email.com',
        password: '12345678',
        role: 'user'
      })
      .expect(201)
      .expect('location', url + '/2');
  });

  it('GET /:id should get a specific user', function () {
    return request.get(url + '/2')
      .auth(userInfo.email, userInfo.password)
      .expect(200)
      .expect({
        id: 2,
        email: 'test2@email.com',
        role: 'user'
      });
  });

  it('PUT /:id should update a user', function () {
    return request.put(url + '/2')
      .auth(userInfo.email, userInfo.password)
      .send({
        email: 'test3@email.com',
        role: 'user'
      })
      .expect(204)
      .then(function (res) {
        return request.get(url + '/2')
          .auth(userInfo.email, userInfo.password)
          .expect(200)
          .expect({
            id: 2,
            email: 'test3@email.com',
            role: 'user'
          });
      });
  });

  it('DELETE /:id should delete a user', function () {
    return request.delete(url + '/2')
      .auth(userInfo.email, userInfo.password)
      .expect(204)
      .then(function (res) {
        return request.get(url + '/2')
          .auth(userInfo.email, userInfo.password)
          .expect(404);
      });
  });

});
