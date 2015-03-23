'use strict';
/**
 * @module init/server
 * @description The server initializer. Uses express 4.x.
 *
 * @requires core:fs
 * @requires core:https
 * @requires core:path
 * @requires npm:bluebird
 * @requires npm:express
 * @requires npm:compression
 * @requires npm:body-parser
 * @requires npm:method-override
 * @requires npm:passport
 * @requires config
 * @requires lib/log
 * @requires lib/react-middleware
 */

var fs      = require('fs');
var https   = require('https');
var path    = require('path');
var Promise = require('bluebird');
var express = require('express');
var config  = require('../config');
var log     = require('../lib/log');
var app     = express();

// Express middleware
var compression     = require('compression');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var passport        = require('passport');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var reactMiddleware = require('../lib/react-middleware');

var KEY_PATH  = config.get('key');
var CERT_PATH = config.get('cert');

// These are the https options. The configuration for the key and cert are
// filepaths to the ssl key and certificate files.
log.debug('Reading ssl key "%s" and cert "%s"', KEY_PATH, CERT_PATH);
var options  = {
  key: fs.readFileSync(config.get('key')),
  cert: fs.readFileSync(config.get('cert'))
};
log.debug('Successfully read ssl key and cert');

module.exports = function initServer() {
  // This is where we set all of the top level middleware such as loggers,
  // compressors, parsers, rate limiters and such.

  /** @todo TODO add rate limiting middleware */
  /** @todo TODO add logging middleware */
  app.disable('x-powered-by');
  app.set('json spaces', 2);
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session({
    store: false,
    secret: '32lqrewafsdlifqu4po243asdv42qp38123423',
    proxy: false,
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000 // 1 hour
    }
  }));

  // This is our main api router w/ logging middleware
  log.debug('Initializing routes');
  app.use(passport.initialize());
  app.use('/api', require('../routes'));
  log.debug('Initialized routes');

  app.use(express.static(path.resolve(__dirname, '..', 'public')));
  app.use(reactMiddleware);

  // return the promise of a new server
  return new Promise(function (resolve, reject) {
    log.debug('Initializing https server');
    https.createServer(options, app)
      .listen(config.get('port'))
      .on('listening', resolve)
      .on('error', reject);
  }).then(function () {
    log.debug('Initialized https server');
    log.info('Server started at %s', config.get('host'));
  });
};
