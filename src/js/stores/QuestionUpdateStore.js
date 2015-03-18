'use strict';

var Reflux          = require('reflux');
var QuestionActions = require('../actions/QuestionActions');

var QuestionUpdateStore = Reflux.createStore({
  init: function () {
    this.state = {
      loading: false,
      error: false,
      success: false
    };

    this.listenTo(QuestionActions.update, 'update');
    this.listenTo(QuestionActions.update.success, 'updateSuccess');
    this.listenTo(QuestionActions.update.failure, 'updateFailure');

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

module.exports = QuestionUpdateStore;
