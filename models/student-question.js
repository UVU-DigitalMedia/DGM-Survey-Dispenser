'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var config   = require('configly').config;
var types    = config.get('question.types');

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

var StudentQuestionSchema = new Schema({
  label: {
    type: String,
    index: { unique: true },
    required: true
  },
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: Object.keys(types)
  },
  choices: [{
    label: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    }
  }]
});

var typesExport = {};
Object.keys(types).map(function (type) {
  typesExport[type] = types[type].label;
});

StudentQuestionSchema.static('types', typesExport);

// Add createdAt property
StudentQuestionSchema.plugin(require('mongoose-created-at'));
// Add updatedAt property
StudentQuestionSchema.plugin(require('mongoose-updated-at'));

module.exports = StudentQuestionSchema;
