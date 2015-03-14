'use strict';

var Reflux = require('reflux');
var users  = require('../services/users');

var UserActions = Reflux.createActions({
  create : {children: ['success', 'failure']},
  read   : {children: ['success', 'failure']},
  update : {children: ['success', 'failure']},
  delete : {children: ['success', 'failure']}
});

UserActions.create.listen(function (user) {
  users.create(user)
    .then(UserActions.read)
    .then(this.success)
    .catch(this.failure);
});

UserActions.read.listen(function () {
  users.read()
    .then(this.success)
    .catch(this.failure);
});

UserActions.update.listen(function (user) {
  users.update(user)
    .then(UserActions.read)
    .then(this.success)
    .catch(this.failure);
});

UserActions.delete.listen(function (user) {
  users.delete(user)
    .then(UserActions.read)
    .then(this.success)
    .catch(this.failure);
});

module.exports = UserActions;
