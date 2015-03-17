'use strict';

var Reflux      = require('reflux');
var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({
  init: function () {
    this.state = {
      users: [],
      create: {
        loading: false,
        error: false
      },
      read: {
        loading: false,
        error: false
      },
      update: {
        loading: false,
        error: false
      },
      delete: {
        loading: false,
        error: false
      }
    };

    this.listenTo(UserActions.create, 'create');
    this.listenTo(UserActions.create.success, 'createSuccess');
    this.listenTo(UserActions.create.failure, 'createFailure');

    this.listenTo(UserActions.read, 'read');
    this.listenTo(UserActions.read.success, 'readSuccess');
    this.listenTo(UserActions.read.failure, 'readFailure');

    this.listenTo(UserActions.update, 'update');
    this.listenTo(UserActions.update.success, 'updateSuccess');
    this.listenTo(UserActions.update.failure, 'updateFailure');

    this.listenTo(UserActions.delete, 'delete');
    this.listenTo(UserActions.delete.success, 'deleteSuccess');
    this.listenTo(UserActions.delete.failure, 'deleteFailure');

  },

  create: function () {
    this.state.create.loading = true;
    this.state.create.error = null;
    this.trigger(this.state);
  },
  createSuccess: function () {
    this.state.create.loading = false;
    this.trigger(this.state);
  },
  createFailure: function (err) {
    this.state.create.loading = false;
    this.state.create.error = err;
    this.trigger(this.state);
  },

  read: function () {
    this.state.read.loading = true;
    this.state.read.error = null;
    this.trigger(this.state);
  },
  readSuccess: function (users) {
    this.state.read.loading = false;
    this.state.users = users;
    this.trigger(this.state);
  },
  readFailure: function (err) {
    this.state.read.loading = false;
    this.state.read.error = err;
    this.trigger(this.state);
  },

  update: function () {
    this.state.update.loading = true;
    this.state.update.error = null;
    this.trigger(this.state);
  },
  updateSuccess: function () {
    this.state.update.loading = false;
    this.trigger(this.state);
  },
  updateFailure: function (err) {
    this.state.update.loading = false;
    this.state.update.error = err;
    this.trigger(this.state);
  },

  delete: function () {
    this.state.delete.loading = true;
    this.state.delete.error = null;
    this.trigger(this.state);
  },
  deleteSuccess: function () {
    this.state.delete.loading = false;
    this.trigger(this.state);
  },
  deleteFailure: function (err) {
    this.state.delete.loading = false;
    this.state.delete.error = err;
    this.trigger(this.state);
  },

  getById: function (id) {
    id = parseInt(id, 10);
    var users = this.state.users;
    for (var i = 0, len = users.length; i < len; i += 1) {
      if (users[i].id === id) { return users[i]; }
    }
  }

});

module.exports = UserStore;
