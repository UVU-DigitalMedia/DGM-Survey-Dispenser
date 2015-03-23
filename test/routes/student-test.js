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

    it('POST /:uvid/question get a random question', function () {
      return request.post('/api/v1/questions')
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
        .then(function (res) {
          return request.get(url + '/12345678/question')
            .expect(200);
        })
        .then(function (res) {
          expect(res.body.id).to.equal(1);
        });
    });

    it('POST /:uvid/answer/:qid answer a question', function () {
      return request.post(url + '/12345678/answer/1')
        .send({id: 1})
        .expect(204)
        .then(function () {
          return request.get(url + '/12345678/question')
            .expect(200);
        })
        .then(function (res) {
          expect(res.body).to.eql({});
        });
    });

    it('POST /:uvid/answer/:qid answer question with text value', function () {
      return request.post('/api/v1/questions')
        .auth(user.email, user.password)
        .send({
          label: 'My Second Question',
          description: 'This is my second question',
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
        .then(function (res) {
          return request.get(url + '/12345678/question')
            .expect(200);
        })
        .then(function (res) {
          var choices = res.body.choices;
          var last = choices[choices.length - 1];
          return request.post(url + '/12345678/answer/' + res.body.id)
            .send({id: last.id, value: 'answer value'})
            .expect(204);
        });
    });

    it('POST /:uvid/answer/:qid answer question multiple chosen', function () {
      return request.post('/api/v1/questions')
        .auth(user.email, user.password)
        .send({
          label: 'My Third Question',
          description: 'This is my third question',
          type: 'multipleCorrect',
          choices: [
            {label: 'Choice 1'},
            {label: 'Choice 2'},
            {label: 'Choice 3'},
            {label: 'Choice 4'},
            {label: 'Other', dynamicValue: true}
          ]
        })
        .expect(201)
        .then(function (res) {
          return request.get(url + '/12345678/question')
            .expect(200);
        })
        .then(function (res) {
          var choices = res.body.choices;
          var first = choices[0];
          var last = choices[choices.length - 1];
          return request.post(url + '/12345678/answer/' + res.body.id)
            .send([
              {id: first.id},
              {id: last.id, value: 'answer value'}
            ])
            .expect(204);
        });
    });

    it('POST /:uvid/answer/:qid answer question multiple chosen', function () {
      return request.post('/api/v1/questions')
        .auth(user.email, user.password)
        .send({
          label: 'My Fourth Question',
          description: 'This is my fourth question',
          type: 'shortAnswer',
          choices: [
            {label: 'Your answer?'}
          ]
        })
        .expect(201)
        .then(function (res) {
          return request.get(url + '/12345678/question')
            .expect(200);
        })
        .then(function (res) {
          var choice = res.body.choices[0];
          return request.post(url + '/12345678/answer/' + res.body.id)
            .send({id: choice.id, value: 'test value'})
            .expect(204);
        });
    });

  });

});
