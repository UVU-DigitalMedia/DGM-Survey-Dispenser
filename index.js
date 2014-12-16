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
    email: 'chadwtkns@gmail.com',
    password: 'testpassword',
    role: 'admin'
  });
});

// Server and Routes
require('./init/server')(function (err) {
  /* istanbul ignore if: we shouldn't count on server initialization errors */
  if (err) { throw err; }
  console.log('Started the server');
});
