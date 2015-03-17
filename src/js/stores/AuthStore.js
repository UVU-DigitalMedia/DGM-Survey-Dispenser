'use strict';

var Reflux      = require('reflux');
var AuthActions = require('../actions/AuthActions');

var AuthStore = Reflux.createStore({
  init: function () {
    console.log('init authStore');
    this.state = {
      user: window.user || null,
      roles: window.roles || [],
      error: null,
      loading: null
    };

    this.listenTo(AuthActions.login, 'loginLoading');
    this.listenTo(AuthActions.login.success, 'loginSuccess');
    this.listenTo(AuthActions.login.failure, 'reportError');

    this.listenTo(AuthActions.logout, 'logoutLoading');
    this.listenTo(AuthActions.logout.success, 'logoutSuccess');
    this.listenTo(AuthActions.logout.failure, 'reportError');
  },

  loginLoading: function () {
    this.state.loading = true;
    this.user = null;
    this.error = null;
    this.trigger(this.state);
  },
  loginSuccess: function (info) {
    this.state.loading = false;
    this.state.user = info.user;
    this.state.roles = info.roles;
    this.trigger(this.state);
  },

  logoutLoading: function () {
    this.state.loading = true;
    this.state.error = null;
    this.trigger(this.state);
  },
  logoutSuccess: function () {
    this.state.loading = false;
    this.state.user = null;
    this.trigger(this.state);
  },

  reportError: function (err) {
    this.state.loading = false;
    this.state.error = err;
    this.trigger(this.state);
  }
});

module.exports = AuthStore;
