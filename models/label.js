'use strict';
/**
 * @module models/label
 * @class Label
 * @classdesc A label is a way to classify a task.
 * to get done
 *
 * @requires npm:sequelize
 * @requires lib/db
 *
 * @see http://sequelize.readthedocs.org/en/latest/api/model/
 */

var Sequelize = require('sequelize');
var db        = require('../lib/db');

var colors    = require('./shared/colors');

var Label = db.define('Label', {
  /** @member {String} Label#name - the name of the label */
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  /** @member {String} [Label#order] - the order of the label */
  order: {
    type: Sequelize.INTEGER,
    default: 0
  },
  /** @member {String} Label#color - The color of the label */
  color: {
    type: Sequelize.ENUM(Object.keys(colors)),
    default: colors.NO_COLOR,
    allowNull: false
  }
}, {
  hooks: {},
  classMethods: {},
  instanceMethods: {}
});

Label.belongsToMany(require('./task'), {through: 'TaskLabel'});

module.exports = Label;
