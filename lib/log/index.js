'use strict';
/**
 * @module lib/log
 * @description The app logger. Uses a winston logger instance. Writes to
 * stdout and a log file. Log files are saved in ./logs/
 *
 * @requires core:path
 * @requires npm:winston
 * @requires config
 *
 * @example
 * var log = require('./lib/log');
 * var value = 'test value';
 * var port  = '8000';
 *
 * log.silly('The Kraken has been released!');
 * log.debug('here is the value: %s', value);
 * log.verbose('Starting the app');
 * log.info('Server has started on port %s', port);
 * log.warn('404');
 * log.error(new Error('Something bad happened'));
 * log('info', 'You can log this way, too');
 *
 * @todo TODO Maybe switch to a DB logging system? MongoDB seems like a good
 * option, especially for some schemaless logs.
 */

var path        = require('path');
var winston     = require('winston');
var config      = require('../../config');

var LOG_LEVEL   = config.get('logLevel');
var LOG_PATH    = path.resolve(__dirname, '..', '..', 'logs');
var LOG_PATTERN = '.yyyy-MM-dd.log';

var transports = [
  new winston.transports.DailyRotateFile({
    handleExceptions: true,
    filename: path.join(LOG_PATH, 'all'),
    datePattern: LOG_PATTERN,
    level: LOG_LEVEL,
    maxsize: 1024 * 1000 * 5, // 5mb
    maxFiles: 5
  }),
  new winston.transports.Console({
    handleExceptions: true,
    level: LOG_LEVEL,
    colorize: true,
    prettyPrint: true,
    silent: config.get('disableConsole')
  })
];

var logger = new winston.Logger({ transports: transports });

module.exports = logger;
