'use strict';

var chai    = require('chai');
var User    = require('../../models/user');
var request = require('../test-helpers/request');
var app     = require('../test-helpers/app');
var expect  = chai.expect;

var url = '/api/v1/questions';

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

  it('GET / should get list of empty question', function () {
    return request.get(url)
      .auth(user.email, user.password)
      .expect(200)
      .expect([]);
  });

  it('POST / should create question with choices', function () {
    return request.post(url)
      .auth(user.email, user.password)
      .send({
        label: 'My Question',
        description: 'This is my first question',
        type: 'multipleChoice',
        choices: [
          {label: 'Choice 1'},
          {label: 'Choice 2'},
          {label: 'Choice 3'},
          {label: 'Choice 4'},
          {label: 'Other', dynamicValue: true}
        ]
      })
      .expect(201)
      .expect('location', url + '/1');
  });

  it('GET /:id should get specific question', function () {
    return request.get(url + '/1')
      .auth(user.email, user.password)
      .expect(200)
      .then(function (res) {
        return require('../../models/choice').findAll({where: {questionId: res.body.id}})
      })
      .then(function (choices) {
        console.log(choices);
      });
  });

});
