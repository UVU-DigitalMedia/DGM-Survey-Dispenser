'use strict';

var app = require('../../app');
var db  = require('../../lib/db');

exports.init = function () {
  return app.then(function () {
    return db.sync({force: true});
  });
};
