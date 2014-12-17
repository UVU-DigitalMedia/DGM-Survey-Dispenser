'use strict';

// Configuration
require('./init/config');

// Models
require('./init/models');

// Database
require('./init/db')(function (err) {
  /* istanbul ignore if: we shouldn't count on database errors */
  if (err) { throw err; }
  console.log('Connected to database');
  require('mongoose').model('User').defaultUser({
    email: 'test@test.com',
    password: 'admin',
    role: 'admin'
  }).then(function () {
    process.exit();
  });
});
