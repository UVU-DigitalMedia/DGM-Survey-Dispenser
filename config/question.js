'use strict';

module.exports = {
  types: {
    multipleChoice: {
      label: 'Multiple Choice',
      validate: validateMultipleChoice
    },
    multipleCorrect: {
      label: 'Multiple Correct',
      validate: function (values, choices) {
        if (!Array.isArray(values)) { return false; }
        if (!values.length) { return true; }
        return values.some(function (value) {
          return validateMultipleChoice(value, choices);
        });
      }
    },
    trueFalse: {
      label: 'True/False',
      validate: function (value) {
        return typeof value === 'boolean';
      }
    },
    shortAnswer: {
      label: 'Short Answer',
      validate: function (value) {
        return Boolean(value);
      }
    },
    essay: {
      label: 'Essay',
      validate: function (value) {
        return Boolean(value);
      }
    },
    ordering: {
      label: 'Ordering',
      validate: function (value, choices) {
        if (!Array.isArray(value) && value.length !== choices.length) {
          return false;
        }
        return value.every(function (value) {
          return validateMultipleChoice(value, choices);
        });
      }
    },
  }
};

function validateMultipleChoice(value, choices) {
  var hasDirectChoice = choices.indexOf(value) !== -1;
  var isOtherChoice = choices.indexOf('Other') !== -1 &&
      value.indexOf('Other:') === 0;
  return hasDirectChoice || isOtherChoice;
}
