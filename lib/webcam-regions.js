'use strict';

var getRegions  = require('./get-regions');
var webcamImage = require('./webcam-image');

module.exports = function (regions, cb) {
  webcamImage(function (err, img) {
    if (err) { return cb(err); }
    getRegions(img, regions, function (err, images) {
      cb(err, images, img);
    });
  });
};
