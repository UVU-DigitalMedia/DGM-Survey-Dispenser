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
 *
 * @see http://sequelize.readthedocs.org/en/latest/api/model/
 */

var Sequelize = require('sequelize');
var db        = require('../lib/db');
var errors    = require('../lib/errors');

var Student = db.define('Student', {
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

module.exports = Student;
