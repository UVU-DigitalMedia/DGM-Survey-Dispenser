'use strict';

if (process.platform === 'darwin') {
  module.exports = function () {
    return require('bluebird').resolve();
  };
  return;
}

var PIN   = 10;
var servo = require('../servo').bind(null, PIN);

module.exports = function () {
  return servo(0)
    .then(servo.bind(null, 180))
    .then(servo.bind(null, 0))
    .then(servo.bind(null, undefined, 0));
};
