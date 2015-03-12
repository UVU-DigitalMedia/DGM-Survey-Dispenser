'use strict';

var path    = require('path');
var appPath = path.resolve(__dirname, '..', '..', 'public', 'index.html');

function index(req, res, next) {
  res.sendFile(appPath);
}

module.exports = index;
