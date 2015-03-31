'use strict';

var Promise = require('bluebird');
var Galileo = require('galileo-io');
var board   = new Galileo();

var next = new Promise(function (resolve, reject) {
  board.on('ready', resolve).on('error', reject);
});

module.exports = function (pin, val) {
  next = next.then(function () {
    board.servoWrite(pin, val);
  });
  return next;
};
