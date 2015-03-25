'use strict';

var Reflux = require('reflux');
var StudentActions = require('../actions/StudentActions');

var StudentStore = Reflux.createStore({
  init: function () {
    this.state = {
      student: null,
      loading: false,
      success: false,
      error: null
    };

    this.listenTo(StudentActions.login, 'loginLoading');
    this.listenTo(StudentActions.login.success, 'loginSuccess');
    this.listenTo(StudentActions.login.failure, 'loginFailure');

    this.listenTo(StudentActions.logout, 'logout');
  },

  loginLoading: function () {
    this.state.loading = true;
    this.state.error = null;
    this.trigger(this.state);
  },

  loginSuccess: function (student) {
    this.state.loading = false;
    this.state.student = student;
    this.state.success = true;
    this.trigger(this.state);
    this.state.success = false;
    this.trigger(this.state);
  },

  loginFailure: function (err) {
    this.state.loading = false;
    this.state.error = err;
    this.trigger(this.state);
  },

  logout: function () {
    this.state.student = null;
    this.trigger(this.state);
  }
});

module.exports = StudentStore;
