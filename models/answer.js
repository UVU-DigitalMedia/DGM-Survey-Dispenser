'use strict';
/**
 * @module models/answer
 * @class Answer
 * @classdesc The Answer model is used to keep track of student answers. a
 * student can have multiple answers to a single question if the question is of
 * the type 'multipleSelect'
 *
 * @requires npm:sequelize
 * @requires lib/db
 * @requires lib/errors
 * @requires lib/question-types
 * @requires models/choice
 */

var Sequelize = require('sequelize');
var db        = require('../lib/db');
var errors    = require('../lib/errors');
var types     = require('../lib/question-types');


var Answer = db.define('Answer', {
  value: {
    type: Sequelize.STRING(1000)
  }
}, {
  hooks: {},
  classMethods: {},
  instanceMethods: {}
});

module.exports = Answer;
