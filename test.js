'use strict';

var fs = require('fs');

var webcamRegions = require('./lib/webcam-regions');

var regions = [
  {
    width: 100,
    height: 200,
    x: 100,
    y: 200
  },
  {
    width: 200,
    height: 100,
    x: 500,
    y: 500
  }
];

webcamRegions(regions, function (err, images, main) {
  if (err) { return console.error(err); }
  fs.writeFile('all.jpg', main, function () {});
  images.map(function (img, index) {
    fs.writeFile(index + '.jpg', img.content, function () {});
  });
});
