'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var request = require('supertest-as-promised');
var config  = require('../../config');

module.exports = request.agent(config.get('host'));
