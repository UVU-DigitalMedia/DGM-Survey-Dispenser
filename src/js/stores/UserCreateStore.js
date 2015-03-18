'use strict';

var Reflux      = require('reflux');
var UserActions = require('../actions/UserActions');

var UserCreateStore = Reflux.createStore({
  init: function () {
    this.state = {
      loading: false,
      error: false,
      success: false
    };

    this.listenTo(UserActions.create, 'create');
    this.listenTo(UserActions.create.success, 'createSuccess');
    this.listenTo(UserActions.create.failure, 'createFailure');

  },

  create: function () {
    this.state.loading = true;
    this.state.error = null;
    this.trigger(this.state);
  },
  createSuccess: function () {
    this.state.loading = false;
    this.state.success = true;
    this.trigger(this.state);
    this.state.success = false;
    this.trigger(this.state);
  },
  createFailure: function (err) {
    this.state.loading = false;
    this.state.error = err;
    this.trigger(this.state);
  }

});

module.exports = UserCreateStore;
