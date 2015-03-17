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

  it('POST / should fail to create duplicate question label', function () {
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
      .expect(400);
  });

  it('GET /:id should get specific question', function () {
    return request.get(url + '/1')
      .auth(user.email, user.password)
      .expect(200)
      .then(function (res) {
        expect(res.body.choices).to.have.length(5);
        expect(res.body.choices[0].id).to.equal(1);
        expect(res.body.choices[1].id).to.equal(2);
        expect(res.body.choices[2].id).to.equal(3);
        expect(res.body.choices[3].id).to.equal(4);
        expect(res.body.choices[4].id).to.equal(5);
      });
  });

  it('GET / should get all questions with created question', function () {
    return request.get(url)
      .auth(user.email, user.password)
      .expect(200)
      .then(function (res) {
        expect(res.body[0].choices).to.have.length(5);
        expect(res.body[0].choices[0].id).to.equal(1);
        expect(res.body[0].choices[1].id).to.equal(2);
        expect(res.body[0].choices[2].id).to.equal(3);
        expect(res.body[0].choices[3].id).to.equal(4);
        expect(res.body[0].choices[4].id).to.equal(5);
      });
  });

  it('PUT /:id should update a question', function () {
    return request.put(url + '/1')
      .auth(user.email, user.password)
      .send({label: 'My new question'})
      .expect(204)
      .then(function (res) {
        return request.get(url + '/1')
          .auth(user.email, user.password)
          .expect(200);
      })
      .then(function (res) {
        expect(res.body.label).to.equal('My new question');
      });
  });

  it('DELETE /:id should delete a question', function () {
    return request.del(url + '/1')
      .auth(user.email, user.password)
      .expect(204)
      .then(function () {
        return require('../../models/choice').findAll();
      })
      .then(function (choices) {
        expect(choices).to.eql([]);
      });
  });

  it('POST / should fail to create invalid question type', function () {
    return request.post(url)
      .auth(user.email, user.password)
      .send({
        label: 'My Question',
        description: 'This is my first question',
        type: 'multipleChoicea',
        choices: [
          {label: 'Choice 1'},
          {label: 'Choice 2'},
          {label: 'Choice 3'},
          {label: 'Choice 4'},
          {label: 'Other', dynamicValue: true}
        ]
      })
      .expect(400);
  });

  it('POST / should create with different question type', function () {
    return request.post(url)
      .auth(user.email, user.password)
      .send({
        label: 'My Question',
        description: 'This is my first question',
        type: 'multipleCorrect',
        choices: [
          {label: 'Choice 1'},
          {label: 'Choice 2'},
          {label: 'Choice 3'},
          {label: 'Choice 4'},
          {label: 'Other', dynamicValue: true}
        ]
      })
      .expect(201);
  });

  it('POST / should create with different question type', function () {
    return request.post(url)
      .auth(user.email, user.password)
      .send({
        label: 'My second Question',
        description: 'This is my first question',
        type: 'shortAnswer',
        choices: [
          {label: 'Answer?'}
        ]
      })
      .expect(201);
  });

});
