'use strict';
/**
 * @module models/task
 * @class Task
 * @classdesc A task is an item to help organize and remember things that need
 * to get done
 *
 * @requires npm:sequelize
 * @requires lib/db
 *
 * @see http://sequelize.readthedocs.org/en/latest/api/model/
 */

var Sequelize = require('sequelize');
var db        = require('../lib/db');

var Task = db.define('Task', {
  /** @member {String} Task#name - the name of the task */
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  /** @member {String} [Task#description] - the description of the task */
  description: {
    type: Sequelize.STRING(1000)
  },
  /** @member {String} [Task#order] - the order of the list */
  order: {
    type: Sequelize.INTEGER,
    default: 0
  },
  /** @member {String} [Task#dueDate] - the date that the task is due */
  dueDate: {
    type: Sequelize.DATE
  }
}, {
  hooks: {},
  classMethods: {},
  instanceMethods: {}
});

module.exports = Task;
