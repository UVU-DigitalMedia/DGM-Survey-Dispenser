'use strict';

var Reflux = require('reflux');
var auth   = require('../services/auth');

var AuthActions = Reflux.createActions({
  login  : {children: ['success', 'failure']},
  logout : {children: ['success', 'failure']}
});

AuthActions.login.listen(function (email, password) {
  var user;
  auth.login(email, password)
    .then(function (foundUser) {
      user = foundUser;
      return auth.roles();
    })
    .then(function (roles) {
      return {user: user, roles: roles};
    })
    .then(this.success)
    .catch(this.failure);
});

AuthActions.logout.listen(function () {
  auth.logout()
    .then(this.success)
    .catch(this.failure);
});

module.exports = AuthActions;
