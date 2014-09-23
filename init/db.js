'use strict';

var config = require('configly').config;

// initDb
// ======
//
// Gives you function with which you can initialize the mongoose connection
//
// ### Parameters
//
// * dbConnection (String) - The db connection string which looks something like
//   this: `'mongodb://host:port/dbname'`
//
// ### Returns
//
// a function that takes a callback from when the connection is made.
function initDb(cb) {
  require('mongoose')
    .connect(config.get('env.db'), cb)
    .connection.on('error', cb);
}

module.exports = initDb;
