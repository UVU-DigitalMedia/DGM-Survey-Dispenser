'use strict';

var fs      = require('fs');
var path    = require('path');
var express = require('express');
var config  = require('configly').config;
var ssl     = null;

// If you want to use https, set ssl to look like:
// {
//   key: fs.readFileSync('/path/to/key.pem'),
//   cert: fs.readFileSync('/path/to/cert.pem')
// }
// or
// {
//   pfx: fs.readFileSync('/path/to/server.pfx')
// }

var app = express();
app.disable('x-powered-by');

// set up the middleware chain
[
  require('compression')(),
  require('body-parser').urlencoded({extended: true}),
  require('body-parser').json(),
  require('method-override')(),
  require('cookie-parser')(),
  require('express-session')(config.get('env.session')),
  require('csurf')(),
  function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  },
  express.static(path.resolve(__dirname, '../', 'public'))
].map(function (middleware) {
  app.use(middleware);
});

// link up the routes
app.use('/', require('../routes'));

// need this callback to use the error handler for the server.
function initServer(cb) {
  var server;
  if (ssl) {
    server = require('https').createServer(ssl, app);
  } else {
    server = require('http').createServer(app);
  }
  server.listen(config.get('env.port'), cb).on('error', cb);
}

module.exports = initServer;
