'use strict';

var Promise = require('bluebird');
var request = require('superagent');

exports.create = function (question) {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/questions')
      .send(question)
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve();
      });
  });
};

exports.read = function () {
  return new Promise(function (resolve, reject) {
    request.get('/api/v1/questions')
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve(res.body);
      });
  });
};

exports.update = function (question) {
  delete question.choices;
  return new Promise(function (resolve, reject) {
    request.put('/api/v1/users/' + question.id)
      .send(question)
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve(res.body);
      });
  });
};

exports.delete = function (question) {
  return new Promise(function (resolve, reject) {
    request.delete('/api/v1/users/' + question.id)
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve(res.body);
      });
  });
};
