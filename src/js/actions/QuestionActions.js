'use strict';

var Reflux    = require('reflux');
var questions = require('../services/questions');

var QuestionActions = Reflux.createActions({
  create     : {children: ['success', 'failure']},
  read       : {children: ['success', 'failure']},
  update     : {children: ['success', 'failure']},
  delete     : {children: ['success', 'failure']},
  activate   : {children: ['success', 'failure']},
  deactivate : {children: ['success', 'failure']}
});

QuestionActions.create.listen(function (question) {
  questions.create(question)
    .then(QuestionActions.read)
    .then(this.success)
    .catch(this.failure);
});

var typesCache;

QuestionActions.read.listen(function () {
  questions.read().bind({})
    .then(function (qs) {
      this.questions = qs;
      return questions.types();
    })
    .then(function (types) {
      this.types = types;
      return this;
    })
    .then(this.success)
    .catch(this.failure);
});

QuestionActions.update.listen(function (question) {
  questions.update(question)
    .then(QuestionActions.read)
    .then(this.success)
    .catch(this.failure);
});

QuestionActions.delete.listen(function (question) {
  questions.delete(question)
    .then(QuestionActions.read)
    .then(this.success)
    .catch(this.failure);
});

QuestionActions.activate.listen(function (question) {
  question.update({
    id: question.id,
    active: true
  })
    .then(QuestionActions.read)
    .then(this.success)
    .catch(this.failure);
});

QuestionActions.deactivate.listen(function (question) {
  question.update({
    id: question.id,
    active: false
  })
    .then(QuestionActions.read)
    .then(this.success)
    .catch(this.failure);
});

module.exports = QuestionActions;
