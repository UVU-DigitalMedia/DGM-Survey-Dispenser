'use strict';
/**
 * @module models/student
 * @class Student
 * @classdesc The Student model is used to keep track of individual student
 * answers
 *
 * @requires npm:sequelize
 * @requires lib/db
 * @requires lib/errors
 * @requires models/answer
 *
 * @see http://sequelize.readthedocs.org/en/latest/api/model/
 */

var Sequelize = require('sequelize');
var db        = require('../lib/db');
var errors    = require('../lib/errors');
var Answer    = require('./answer');

var Student = db.define('Student', {
  /** @member {String} Student#uvid - The student's uvid */
  uvid: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [8,10]
    }
  }
}, {
  hooks: {},
  classMethods: {},
  instanceMethods: {}
});

Student.hasMany(Answer, {as: 'answers'});

module.exports = Student;
