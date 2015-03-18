'use strict';

var Reflux          = require('reflux');
var QuestionActions = require('../actions/QuestionActions');

var QuestionDeleteStore = Reflux.createStore({
  init: function () {
    this.state = {
      loading: false,
      error: false,
      success: false
    };

    this.listenTo(QuestionActions.delete, 'delete');
    this.listenTo(QuestionActions.delete.success, 'deleteSuccess');
    this.listenTo(QuestionActions.delete.failure, 'deleteFailure');

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

module.exports = QuestionDeleteStore;
