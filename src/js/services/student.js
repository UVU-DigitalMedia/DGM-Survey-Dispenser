'use strict';

var Promise = require('bluebird');
var request = require('superagent');

exports.login = function (uvid) {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/students/' + uvid + '/login')
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve(uvid);
      });
  });
};

exports.getQuestion = function (uvid) {
  return new Promise(function (resolve, reject) {
    request.get('/api/v1/students/' + uvid + '/question')
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve(res.body);
      });
  });
};

exports.answerQuestion = function (uvid, question, answer) {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/students/' + uvid + '/answer/' + question.id)
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve(res.body);
      });
  });
};
