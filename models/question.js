'use strict';
/**
 * @module models/question
 * @class Question
 * @classdesc The Question model is used to keep track of  survey questions.
 *
 * @requires npm:arrify
 * @requires npm:bluebird
 * @requires npm:sequelize
 * @requires lib/db
 * @requires lib/errors
 * @requires lib/question-types
 * @requires models/choice
 * @requires models/answer
 */

var arrify    = require('arrify');
var Promise   = require('bluebird');
var Sequelize = require('sequelize');
var db        = require('../lib/db');
var errors    = require('../lib/errors');
var types     = require('../lib/question-types');
var Choice    = require('./choice');
var Answer    = require('./answer');

var Question = db.define('Question', {
  label: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  description: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM(Object.keys(types))
  }
}, {
  hooks: {},
  instanceMethods: {
    attachChoices: function (choices) {
      var self = this;
      choices = arrify(choices);
      var type = types[this.type];
      var id = this.id;
      if (type.type.choices === 'input') {
        return Choice.create({
          label: choices[0].label,
          dynamicValue: true,
          QuestionId: id
        }).then(function () {
          return self;
        });
      }
      return Choice.bulkCreate(
        choices.map(function (choice) {
          return {
            label: choice.label,
            dynamicValue: Boolean(choice.dynamicValue),
            QuestionId: id
          };
        }),
        {validate: true}
      ).then(function () {
        return self;
      });
    },
    answer: function (student, values) {
      values = arrify(values);
      var type = types[this.type];
      var getChoices;
      switch (type.type.choices) {
        case 'list': getChoices = this.getChoices(); break;
        case 'input': getChoices = Promise.resolve(); break;
        default:
          getChoices = Promise.reject(Question.errors.InvalidChoices());
          break;
      }
      return getChoices.then(function (choices) {
        var valid = type.validate(values, choices);
        if (!valid) { throw new Question.errors.InvalidAnswers(); }
        return Answer.bulkCreate(
          values.map(function (value) {
            return {
              ChoiceId: value.id,
              StudentId: student.id,
              value: value.value
            };
          }),
          {validate: true}
        );
      });
    }
  },
  classMethods: {}
});

Question.types = Object.keys(types).reduce(function (typesObject, type) {
  typesObject[type] = types[type].label;
  return typesObject;
}, {});

Question.hasMany(Choice, {as: 'choices', onDelete: 'cascade'});

Question.errors = errors({
  InvalidAnswers: 'The answers given are invalid',
  InvalidChoices: 'There are no available choices for that choice type',
  NotFound: 'The question you requested was not found'
});

module.exports = Question;
