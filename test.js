'use strict';

var fs = require('fs');

var webcamRegions = require('./lib/webcam-regions');

var regions = [
  {
    width: 146,
    height: 146,
    x: 289,
    y: 360
  },
  {
    width: 146,
    height: 146,
    x: 607,
    y: 364
  }
];



require('./lib/servo')({
  pin: 9,
  startAt: 120,
  range: [0, 120]
}, function (servo) {
  servo.to(120).stop();

  setTimeout(function () {
    servo.to(0);
    webcamRegions(regions, function (err, images, main) {
      if (err) { return console.error(err); }
      console.log(images[0].color);
      console.log(images[1].color);
      setTimeout(function () {
        servo.to(120).stop();
      }, 5000);
    });
  }, 5000);


});
