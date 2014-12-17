'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var config   = require('configly').config;
var types    = config.get('question.types');
var Promise  = require('bluebird');

// var types = {
//   multipleChoice: 'Multiple Choice',
//   multipleCorrect: 'Multiple Correct',
//   trueFalse: 'True/False',
//   fillIn: 'Fill in the blank',
//   shortAnswer: 'Short Answer',
//   essay: 'Essay',
//   matching: 'Matching',
//   ordering: 'Ordering'
// };

var StudentAnswerSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'StudentQuestion',
    required: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  }
});

StudentAnswerSchema.static('answer', function (student, question, value) {
  var Answer   = this;
  var Question = mongoose.model('StudentQuestion');
  return Question.findById(question).exec().then(function (question) {
    if (!question) { return false; }
    if (!types[question.type]) { return false; }
    var type    = question.type;
    var choices = question.choices;
    var valid   = types[type].validate(value, choices);
    if (!valid) { return false; }
    var answer = new Answer({
      student: student,
      question: question,
      value: value
    });
    return new Promise(function (resolve, reject) {
      answer.save(function (err, answer) {
        if (err) { return reject(err); }
        resolve(answer);
      });
    });
  });
});

// Add createdAt property
StudentAnswerSchema.plugin(require('mongoose-created-at'));
// Add updatedAt property
StudentAnswerSchema.plugin(require('mongoose-updated-at'));

module.exports = StudentAnswerSchema;
