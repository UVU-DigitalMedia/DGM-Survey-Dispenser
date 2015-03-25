'use strict';

var Reflux  = require('reflux');
var student = require('../services/student');

var StudentActions = Reflux.createActions({
  login: {children: ['success', 'failure']},
  getQuestion: {children: ['success', 'failure']},
  answerQuestion: {children: ['success', 'failure']}
});

StudentActions.login.listen(function (uvid) {
  student.login(uvid)
    .then(this.success)
    .catch(this.failure);
});

StudentActions.getQuestion.listen(function (uvid) {
  student.getQuestion(uvid)
    .then(this.success)
    .catch(this.failure);
});

StudentActions.answerQuestion.listen(function (uvid, question, answer) {
  student.answerQuestion(uvid, question, answer)
    .then(this.success)
    .catch(this.failure);
});

StudentActions.logout = Reflux.createAction();

module.exports = StudentActions;
