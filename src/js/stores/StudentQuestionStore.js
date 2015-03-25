'use strict';

var Reflux         = require('reflux');
var StudentActions = require('../actions/StudentActions');

var StudentQuestionStore = Reflux.createStore({
  init: function () {
    this.state = {
      question: null,
      getLoading: false,
      answerLoading: false,
      getSuccess: false,
      answerSuccess: false,
      error: null
    };

    this.listenTo(StudentActions.getQuestion, 'getQuestion');
    this.listenTo(StudentActions.getQuestion.success, 'getQuestionSuccess');
    this.listenTo(StudentActions.getQuestion.failure, 'getQuestionFailure');

    this.listenTo(StudentActions.answerQuestion, 'answer');
    this.listenTo(StudentActions.answerQuestion.success, 'answerSuccess');
    this.listenTo(StudentActions.answerQuestion.failure, 'answerFailure');
  },

  getQuestion: function () {
    this.state.getLoading = true;
    this.state.error = null;
    this.trigger(this.state);
  },
  getQuestionSuccess: function (question) {
    this.state.getLoading = false;
    this.state.question = question;
    this.state.getSuccess = true;
    this.trigger(this.state);
    this.state.getSuccess = false;
    this.trigger(this.state);
  },
  getQuestionFailure: function (err) {
    this.state.getLoading = false;
    this.state.error = err;
    this.trigger(this.state);
  },

  answerQuestion: function () {
    this.state.answerLoading = true;
    this.state.error = null;
    this.trigger(this.state);
  },
  answerQuestionSuccess: function () {
    this.state.answerLoading = false;
    this.state.question = null;
    this.state.answerSuccess = true;
    this.trigger(this.state);
    this.state.answerSuccess = false;
    this.trigger(this.state);
  },
  answerQuestionFailure: function (err) {
    this.state.answerLoading = false;
    this.state.error = err;
    this.trigger(this.state);
  }
});

module.exports = StudentQuestionStore;
