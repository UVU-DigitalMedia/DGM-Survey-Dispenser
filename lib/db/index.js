'use strict';
/**
 * @module lib/db
 * @description The database instance
 *
 * @requires npm:sequelize
 * @requires config
 * @requires lib/log
 */
var Sequelize = require('sequelize');
var config    = require('../../config');
var log       = require('../log');

/**
 * Exports the database connection instance created by Sequelize
 * @see http://sequelize.readthedocs.org/en/latest/docs/getting-started/
 */
module.exports = new Sequelize(config.get('db'), {
  logging: log.verbose,
  define: {
    // Adds deleted_at to all deleted models
    // paranoid: true
  }
});
