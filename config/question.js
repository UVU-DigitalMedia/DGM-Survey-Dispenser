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
        if (!Array.isArray(value)) { return false; }
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
        return values.every(function (value) {
          return validateMultipleChoice(value, choices);
        });
      }
    },
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
