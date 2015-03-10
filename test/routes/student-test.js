'use strict';

var chai    = require('chai');
var User    = require('../../models/user');
var Student = require('../../models/student');
var request = require('../test-helpers/request');
var app     = require('../test-helpers/app');
var expect  = chai.expect;

var url = '/api/v1/students';

describe(url, function () {

  var user = {
    email: 'test@email.com',
    password: '12345678',
    role: 'admin'
  };

  before(function () {
    return app.init().then(function () {
      return User.create(user);
    });
  });

  describe('login', function () {

    it('POST /:uvid/login log student in', function () {
      return request.post(url + '/12345678/login')
        .expect(200)
        .then(function (res) {
          expect(res.body.id).to.equal(1);
          expect(res.body.uvid).to.equal('12345678');
        });
    });

    it('POST /:uvid/login fail to log invalid uvid in', function () {
      return request.post(url + '/1234/login')
        .expect(400);
    });

  });

});
