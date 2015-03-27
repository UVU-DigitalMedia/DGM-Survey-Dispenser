'use strict';
/**
 * @module lib/question-types
 * @description provides a module to validate question types
 */

module.exports = {
  multipleChoice: {
    label: 'Multiple Choice',
    type: {
      value: 'single',
      choices: 'list'
    },
    validate: function (value, choices) {
      var id = parseInt(value[0].id, 10);
      return choices.some(function (choice) {
        return id === choice.id;
      });
    }
  },
  multipleCorrect: {
    label: 'Multiple Correct',
    type: {
      value: 'multiple',
      choices: 'list'
    },
    validate: function (values, choices) {
      return values.every(function (value) {
        value.id = parseInt(value.id, 10);
        return choices.some(function (choice) {
          return value.id === choice.id;
        });
      });
    }
  },
  shortAnswer: {
    label: 'Short Answer',
    type: {
      value: 'single',
      choices: 'input'
    },
    validate: function (value) {
      return Boolean(value);
    }
  }
};
