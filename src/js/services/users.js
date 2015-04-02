'use strict';

var Promise = require('bluebird');
var request = require('superagent');

exports.create = function (user) {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/users')
      .send(user)
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve();
      });
  });
};

exports.read = function () {
  return new Promise(function (resolve, reject) {
    request.get('/api/v1/users')
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve(res.body);
      });
  });
};

exports.update = function (user) {
  return new Promise(function (resolve, reject) {
    request.put('/api/v1/users/' + user.id)
      .send(user)
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve();
      });
  });
};

exports.delete = function (user) {
  return new Promise(function (resolve, reject) {
    request.del('/api/v1/users/' + user.id)
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve();
      });
  });
};

exports.dispense = function () {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/users/dispense')
      .end(function (err, res) {
        if (err) { return reject(res.body); }
        resolve();
      });
  });
};
