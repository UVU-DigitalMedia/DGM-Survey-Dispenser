'use strict';

var gm = require('gm');

module.exports = function (img, cb) {
  gm(img).identify(function (err, img) {
    if (err) { return cb(err); }
    var stats = img['Channel Statistics'];
    cb(null, {
      r: Number(stats.Red.Mean.split(' ')[0]),
      g: Number(stats.Green.Mean.split(' ')[0]),
      b: Number(stats.Blue.Mean.split(' ')[0])
    });
  });
};
