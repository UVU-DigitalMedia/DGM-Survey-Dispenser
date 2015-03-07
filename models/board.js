'use strict';
/**
 * @module models/board
 * @class Board
 * @classdesc A board is a collection of tasks, used to group tasks together
 *
 * @requires npm:sequelize
 * @requires lib/db
 *
 * @see http://sequelize.readthedocs.org/en/latest/api/model/
 */

var Sequelize = require('sequelize');
var db        = require('../lib/db');

var colors    = require('./shared/colors');

var Board = db.define('Board', {
  /** @member {String} Board#name - the name of the board */
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  /** @member {String} [Board#order=0] - the order of the board */
  order: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 0
  },
  /** @member {String} [Board#color='BLUE'] - The color of the label */
  color: {
    type: Sequelize.ENUM(Object.keys(colors)),
    default: colors.BLUE,
    allowNull: false
  }
}, {
  hooks: {},
  classMethods: {},
  instanceMethods: {}
});

Board.hasMany(require('./list'), {as: 'Lists'});
Board.hasMany(require('./label'), {as: 'Labels'});

Board.colors = Object.keys(colors);

module.exports = Board;
