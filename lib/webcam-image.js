'use strict';

var cv = require('opencv');

module.exports = function (index, cb) {
  if (typeof index === 'function') {
    cb = index;
    index = 0;
  }
  var camera = new cv.VideoCapture(index);
  camera.read(function (err, img) {
    if (err) { return cb(err); }
    img.toBufferAsync(cb);
  });
};
