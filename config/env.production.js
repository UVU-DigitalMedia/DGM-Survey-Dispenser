'use strict';

var RedisStore = require('connect-redis')(require('express-session'));

module.exports = {
  sessionStore: function () {
    return new RedisStore({
      host: 'localhost',
      port: 6379
    });
  }
};
