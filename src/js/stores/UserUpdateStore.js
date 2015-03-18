'use strict';

var Reflux      = require('reflux');
var UserActions = require('../actions/UserActions');

var UserUpdateStore = Reflux.createStore({
  init: function () {
    this.state = {
      loading: false,
      error: false,
      success: false
    };

    this.listenTo(UserActions.update, 'update');
    this.listenTo(UserActions.update.success, 'updateSuccess');
    this.listenTo(UserActions.update.failure, 'updateFailure');

  },

  update: function () {
    this.state.loading = true;
    this.state.error = null;
    this.trigger(this.state);
  },
  updateSuccess: function () {
    this.state.loading = false;
    this.state.success = true;
    this.trigger(this.state);
    this.state.success = false;
    this.trigger(this.state);
  },
  updateFailure: function (err) {
    this.state.loading = false;
    this.state.error = err;
    this.trigger(this.state);
  }

});

module.exports = UserUpdateStore;
