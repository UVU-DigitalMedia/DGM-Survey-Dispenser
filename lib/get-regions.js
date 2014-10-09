'use strict';

var gm       = require('gm');
var getColor = require('./get-color');

// getRegions
// ==========
//
// given an image buffer and some region definitions, returns information about
// the cropped regions of the main image, such as the buffer contents and the
// mean color value.
//
// ### Parameters
//
// * `img` (Buffer) - An image in the form of a Buffer
// * `regions` (Array of Objects) - An array of regions to cut out of the image.
//   Each object in the array must have the following propertys: width, height,
//   x, y
// * `cb` - The callback function, with an error object as the first argument
//   and the array of images as the second.
module.exports = function (img, regions, cb) {
  var done = 0;    // keeps track of how many images are done
  var images = []; // keeps track of the image data
  // loop through the region definitions
  regions.map(function (reg, index) {
    images[index] = {}; // initialize the empty image
    gm(img)
      // crop the image
      .crop(reg.width, reg.height, reg.x, reg.y)
      // Convert it to a buffer
      .toBuffer(function (err, img) {
        if (err) { return cb(err); }
        images[index].content = img;
        // Get the color of the image
        getColor(img, function (err, color) {
          if (err) { return cb(err); }
          images[index].color = color;
          done++;
          finish();
        });
      });
  });

  function finish() {
    if (done === regions.length) {
      cb(null, images);
    }
  }
};
