'use strict';

var Promise = require('bluebird');
var request = require('superagent');

var auth = {};

auth.login = function (email, password) {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/users/login')
      .auth(email, password)
      .end(function (err, res) {
        if (err) { return reject(err); }
        resolve(res.body);
      });
  });
};

auth.logout = function () {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/users/logout')
      .end(function (err, res) {
        resolve();
      });
  });
};

auth.roles = function () {
  return new Promise(function (resolve, reject) {
    request.post('/api/v1/users/roles')
      .end(function (err, res) {
        if (err) { return reject(err); }
        resolve(res.body);
      });
  });
};

module.exports = auth;
