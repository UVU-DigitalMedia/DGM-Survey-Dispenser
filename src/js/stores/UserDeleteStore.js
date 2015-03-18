'use strict';

var Reflux      = require('reflux');
var UserActions = require('../actions/UserActions');

var UserDeleteStore = Reflux.createStore({
  init: function () {
    this.state = {
      loading: false,
      error: false,
      success: false
    };

    this.listenTo(UserActions.delete, 'delete');
    this.listenTo(UserActions.delete.success, 'deleteSuccess');
    this.listenTo(UserActions.delete.failure, 'deleteFailure');

  },

  delete: function () {
    this.state.loading = true;
    this.state.error = null;
    this.trigger(this.state);
  },
  deleteSuccess: function () {
    this.state.loading = false;
    this.state.success = true;
    this.trigger(this.state);
    this.state.success = false;
    this.trigger(this.state);
  },
  deleteFailure: function (err) {
    this.state.loading = false;
    this.state.error = err;
    this.trigger(this.state);
  }

});

module.exports = UserDeleteStore;
