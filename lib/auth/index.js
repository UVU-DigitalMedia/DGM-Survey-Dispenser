'use strict';
/**
 * @module lib/auth
 * @description provides authentication middleware using passport, basicAuth
 *
 * @requires npm:passport
 * @requires npm:passport-http
 * @requires model/user
 */

var passport      = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User          = require('../../models/user');

passport.use(new BasicStrategy(function (email, password, done) {
  User.authenticate(email, password)
    .then(done.bind(null, null))
    .catch(User.errors.NotFound, User.errors.WrongPassword, function () {
      done(null, false);
    })
    .catch(done);
}));


