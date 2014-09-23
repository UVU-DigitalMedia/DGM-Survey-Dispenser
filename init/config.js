'use strict';

var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var configRoot  = path.resolve(__dirname, '../', 'config');

// https://github.com/ksmithut/rute
require('rute').root(projectRoot);
// https://github.com/ksmithut/configly
require('configly').setConfig(configRoot);
