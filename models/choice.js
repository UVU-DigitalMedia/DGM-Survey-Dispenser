/**
 * @module models/choice
 * @class Choice
 * @classdesc The Choice model keeps track of the question choices.
 *
 * @requires npm:sequelize
 * @requires lib/db
 * @requires lib/errors
 * @requires lib/question-types
 * @requires models/answer
 */

var Sequelize = require('sequelize');
var db        = require('../lib/db');
var errors    = require('../lib/errors');
var types     = require('../lib/question-types');
var Answer    = require('./answer');

var Choice = db.define('Choice', {
  label: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dynamicValue: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {

});

Choice.hasMany(Answer, {as: 'answers', onDelete: 'cascade'});

module.exports = Choice;
