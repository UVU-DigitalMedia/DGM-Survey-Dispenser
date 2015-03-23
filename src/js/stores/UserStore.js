'use strict';

var Reflux      = require('reflux');
var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({
  init: function () {
    this.state = {
      users: [],
      loading: false,
      error: false,
      success: false
    };

    this.listenTo(UserActions.read, 'read');
    this.listenTo(UserActions.read.success, 'readSuccess');
    this.listenTo(UserActions.read.failure, 'readFailure');

  },

  read: function () {
    this.state.loading = true;
    this.state.error = null;
    this.trigger(this.state);
  },
  readSuccess: function (users) {
    this.state.loading = false;
    this.state.users = users;
    this.state.success = true;
    this.trigger(this.state);
    this.state.success = false;
    this.trigger(this.state);
  },
  readFailure: function (err) {
    this.state.loading = false;
    this.state.error = err;
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
