'use strict';

var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');

var DispenseStore = Reflux.createStore({
  init: function () {
    this.loading = false;

    this.listenTo(UserActions.dispense, 'loading');
    this.listenTo(UserActions.dispense.success, 'done');
    this.listenTo(UserActions.dispense.failure, 'done');
  },
  loading: function () {
    this.loading = true;
    this.trigger(this.loading);
  },
  done: function () {
    this.loading = false;
    this.trigger(this.loading);
  }
});

module.exports = DispenseStore;
