'use strict';

// Configuration
require('./init/config');

// Models
require('./init/models');

// Database
require('./init/db')(function (err) {
  if (err) { throw err; }
  console.log('Connected to database');
});

// Server and Routes
require('./init/server')(function (err) {
  if (err) { throw err; }
  console.log('Started the server');
});
