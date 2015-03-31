'use strict';

var PIN   = 9;
var servo = require('./lib/servo').bind(null, PIN);

servo(180);
servo(0);
servo(180);
servo(360);
servo(180);
