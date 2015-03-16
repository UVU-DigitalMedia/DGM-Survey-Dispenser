'use strict';
/**
 * @module lib/auth
 * @description provides authentication middleware using passport, basicAuth
 *
 * @requires npm:passport
 * @requires npm:passport-http
 * @requires lib/errors
 * @requires model/user
 */

var passport      = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var errors        = require('../errors');
var User          = require('../../models/user');

var auth = {};

auth.loggedIn = function (req, res, next) {
  if (req.session.passport.user) {
    req.user = req.session.passport.user;
    return next();
  }
  passport.authenticate('basic')(req, res, next);
};

auth.hasRole = function () {
  var roles = Array.prototype.slice.call(arguments);
  return function (req, res, next) {
    var user = req.session.passport.user;
    if (!user) { return next(new auth.errors.Unauthorized()); }
    if (roles.indexOf(user.role) === -1) {
      return next(new auth.errors.Forbidden());
    }
    return next();
  };
};

auth.errors = errors({
  Unauthorized: 'You must login to access this resource',
  Forbidden: 'You do not have the access level to access this resource'
});

passport.use(new BasicStrategy(function (email, password, done) {
  User.authenticate(email, password)
    .then(done.bind(null, null))
    .catch(User.errors.NotFound, User.errors.WrongPassword, function () {
      done(new auth.errors.Unauthorized('wrong email or password'));
    })
    .catch(done);
}));

passport.serializeUser(function (user, done) {
  done(null, user.get());
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = auth;
