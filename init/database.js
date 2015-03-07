'use strict';
/**
 * @module init/database
 * @description Initializes the application database. Currently uses mongoose
 * and mongodb
 *
 * @requires lib/db
 * @requires lib/log
 */

var db  = require('../lib/db');
var log = require('../lib/log');

module.exports = function initDatabase() {
  log.debug('Initializing connection to database');
  return db.sync().then(function () {
    log.debug('Initialized connection to database');
  });
};
