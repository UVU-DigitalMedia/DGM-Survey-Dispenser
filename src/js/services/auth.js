'use strict';

var Promise = require('bluebird');
var request = require('superagent');

exports.login = function (email, password) {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/users/login')
      .auth(email, password)
      .end(function (err, res) {
        if (err) { return reject(err); }
        resolve(res.body);
      });
  });
};

exports.logout = function () {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/users/logout')
      .end(function (err, res) {
        resolve();
      });
  });
};

exports.roles = function () {
  return new Promise(function (resolve, reject) {
    request.get('/api/v1/users/roles')
      .end(function (err, res) {
        if (err) { return reject(err); }
        resolve(res.body);
      });
  });
};
