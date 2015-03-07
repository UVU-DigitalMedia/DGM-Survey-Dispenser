'use strict';
/**
 * @module models/list
 * @class List
 * @classdesc A list is a collection of tasks, used to group tasks together
 *
 * @requires npm:sequelize
 * @requires lib/db
 *
 * @see http://sequelize.readthedocs.org/en/latest/api/model/
 */

var Sequelize = require('sequelize');
var db        = require('../lib/db');

var List = db.define('List', {
  /** @member {String} List#name - the name of the list */
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  /** @member {String} [List#order] - the order of the list */
  order: {
    type: Sequelize.INTEGER,
    default: 0
  }
}, {
  hooks: {},
  classMethods: {},
  instanceMethods: {}
});

List.hasMany(require('./task'), {as: 'Tasks'});

module.exports = List;
