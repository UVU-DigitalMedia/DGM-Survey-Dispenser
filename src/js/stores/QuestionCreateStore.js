'use strict';

var Reflux          = require('reflux');
var QuestionActions = require('../actions/QuestionActions');

var QuestionCreateStore = Reflux.createStore({
  init: function () {
    this.state = {
      loading: false,
      error: false,
      success: false
    };

    this.listenTo(QuestionActions.create, 'create');
    this.listenTo(QuestionActions.create.success, 'createSuccess');
    this.listenTo(QuestionActions.create.failure, 'createFailure');

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

module.exports = QuestionCreateStore;
