'use strict';

var Promise = require('bluebird');
var Galileo = require('galileo-io');
var board   = new Galileo();

var init = new Promise(function (resolve, reject) {
  board.on('ready', resolve).on('error', reject);
});

module.exports = function (pin, val) {
  init = init.then(function () {
    board.servoWrite(pin, val);
  });
  return init;
};
