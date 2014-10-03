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
});

// Server and Routes
require('./init/server')(function (err) {
  /* istanbul ignore if: we shouldn't count on server initialization errors */
  if (err) { throw err; }
  console.log('Started the server');
});
