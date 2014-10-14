'use strict';

var five  = require('johnny-five');
var board = new five.Board({
  repl: false
});

// { to: [Function],
//   '@@normalize': [Function],
//   '@@render': [Function],
//   step: [Function],
//   move: [Function],
//   min: [Function],
//   max: [Function],
//   center: [Function],
//   sweep: [Function],
//   stop: [Function],
//   clockWise: [Function],
//   cw: [Function],
//   counterClockwise: [Function],
//   ccw: [Function],
//   write: [Function] }

module.exports = function (opts, cb) {
  board.on('ready', function () {
    var servo = new five.Servo(opts);
    cb(servo);
  });
};
