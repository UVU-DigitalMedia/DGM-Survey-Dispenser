'use strict';

module.exports = {
  types: {
    multipleChoice: 'Multiple Choice',
    multipleCorrect: 'Multiple Correct',
    trueFalse: 'True/False',
    shortAnswer: 'Short Answer',
    essay: 'Essay',
    ordering: 'Ordering'
  },
  validate: {
    multipleChoice: validateMultipleChoice,
    multipleCorrect: function (values, choices) {
      if (!Array.isArray(value)) { return false; }
      if (!values.length) { return true; }
      return values.some(function (value) {
        return validateMultipleChoice(value, choices);
      });
    },
    trueFalse: function (value) {
      return typeof value === 'boolean';
    },
    shortAnswer: function (value) {
      return Boolean(value);
    },
    essay: function (value) {
      return Boolean(value);
    },
    ordering: function (value, choices) {
      if (!Array.isArray(value) && value.length !== choices.length) {
        return false;
      }
      return values.every(function (value) {
        return validateMultipleChoice(value, choices);
      });
    }
  }
};

function validateMultipleChoice(value, choices) {
  if (!Array.isArray(choices) || !choices.length) { return false; }
  if (!value || !value.key || !value.value) { return false; }
  return choices.some(function (choice) {
    if (value.key === 'other' && choice.other === true) { return true; }
    return value.key === choice.key;
  });
}
