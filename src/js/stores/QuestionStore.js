'use strict';

var Reflux          = require('reflux');
var QuestionActions = require('../actions/QuestionActions');

var QuestionStore = Reflux.createStore({
  init: function () {
    this.state = {
      questions: [],
      loading: false,
      error: false,
      success: false
    };

    this.listenTo(QuestionActions.read, 'read');
    this.listenTo(QuestionActions.read.success, 'readSuccess');
    this.listenTo(QuestionActions.read.failure, 'readFailure');
  },

  read: function () {
    this.state.loading = true;
    this.state.error = null;
    this.trigger(this.state);
  },
  readSuccess: function (questions) {
    this.state.loading = false;
    this.state.questions = questions;
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
    var questions = this.state.questions;
    for (var i = 0, len = questions.length; i < len; i += 1) {
      if (questions[i].id === id) { return questions[i]; }
    }
  }

});

module.exports = QuestionStore;
