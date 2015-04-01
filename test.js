'use strict';

var PIN   = 10;
var servo = require('./lib/servo').bind(null, PIN);

servo(0);
servo(180);
servo(0);
servo(undefined);
