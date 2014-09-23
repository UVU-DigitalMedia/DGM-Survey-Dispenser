'use strict';

var config     = require('configly').config;
var mongoose   = require('mongoose');
var validate   = require('mongoose-validator');
var Schema     = mongoose.Schema;

// User
// ====
//
// Properties
// ----------
//
// * `email` (String)
// * `password` (String) (mongoose-pass)
// * `role` (String, enum) (mongoose-role)
// * `createdAt` (Date) (mongoose-created-at)
// * `updatedAt` (Date) (mongoose-updated-at)
// * `isLocked` (Boolean) (mongoose-lock)
// * `attempts` (Number) (mongoose-lock)
// * `lockUntil` (Number) (mongoose-lock)
// * `token` (String) (mongoose-token)
// * `tokenExpires` (Number) (mongoose-token)
//
// Static Properties
// -----------------
//
// * `roles` (Array) (mongoose-roles)
// * `accessLevels` (Object) (mongoose-roles)
// * `reasons` (Object)
//
// Instance Methods
// ----------------
//
// * `user.hasAccess(accessLevel)` (mongoose-role)
// * `user.authenticate(password, [cb])` (mongoose-pass)
// * `user.incAttempts([returnVal][, cb])` (mongoose-lock)
// * `user.setToken([cb])` (mongoose-token)
// * `user.resetToken([cb])` (mongoose-token)
// * `user.reduce()`
//
// Static Methods
// --------------
//
// * `User.roleHasAccess(role, accessLevel)` (mongoose-role)
// * `User.getByToken(token[, query][, cb])` (mongoose-token)
// * `User.authenticate(username, password)`
// * `User.requestPasswordReset(email)`
// * `User.resetPassword(token, email, newPassword)`
// * `User.defaultUser(userObject)`

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {unique: true},
    validate: validate({
      validator: 'isEmail',
      message: 'Must be a valid email'
    })
  }
});

// Add createdAt property
UserSchema.plugin(require('mongoose-created-at'));
// Add updatedAt property
UserSchema.plugin(require('mongoose-updated-at'));
// Adds user roles and access levels to check permissions
UserSchema.plugin(require('mongoose-role'), {
  roles: config.get('user.roles'),
  accessLevels: config.get('user.accessLevels')
});
// Adds a password property and authentication method
UserSchema.plugin(require('mongoose-pass'), {
  saltWorkFactor: config.get('user.saltWorkFactor')
});
// Adds a way to lock an account after failed attempts
UserSchema.plugin(require('mongoose-lock'), {
  maxAttempts: config.get('user.maxFailedAttempts'),
  lockTime: config.get('user.accountLockTime')
});
// Adds a way to generate a randomized token that expires.
UserSchema.plugin(require('mongoose-token'), {
  tokenLength: config.get('user.passwordTokenLength'),
  expire: config.get('user.passwordTokenExpire')
});

// user.reduce()
// -------------
//
// Reduces the user information to it's public information only.
//
// ### Returns
//
// The user object stripped of methods and unpublic data. Really, only admins
// and the user should have access to this information anyway.
UserSchema.method('reduce', function () {
  return {
    id: this.id,
    email: this.email,
    role: this.role,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
});

// User.authenticate(email, password)
// ----------------------------------
//
// Authenticates a user based on the given email and password.
//
// ### Parameters
//
// * `email` (String) - The email of the user being authenticated.
// * `password` (String) - The password of the user being authenticated.
//
// ### Returns
//
// a Promise, which returns the user if the user was authenticated. If the user
// was unable to be authenticated, it will return one of three reasons:
//
// * `User.reasons.NOT_FOUND`
// * `User.reasons.MAX_ATTEMPTS`
// * `User.reasons.PASSWORD_INCORRECT`
//
// Hopefully those are self-explanitory.
var reasons = {
  NOT_FOUND: 0,
  MAX_ATTEMPTS: 1,
  PASSWORD_INCORRECT: 2
};
UserSchema.static('reasons', reasons);

UserSchema.static('authenticate', function (email, password) {
  email    = email || '';
  password = password || '';
  // Find the user by email (which should be unique)
  return this.findOne({email: email}).exec().then(function (user) {
    // if user wasn't found, then return NOT_FOUND
    if (!user) { return reasons.NOT_FOUND; }
    // if the user's account is locked, then increment attempts, and return
    // MAX_ATTEMPTS
    if (user.isLocked) { return user.incAttempts(reasons.MAX_ATTEMPTS); }
    // otherwise, we'll try to authenticate the user
    return user.authenticate(password).then(function (isMatch) {
      // If it's a match, return the user
      if (isMatch) { return user; }
      // otherwise, increment the attempts and return PASSWORD_INCORRECT
      return user.incAttempts(reasons.PASSWORD_INCORRECT);
    });
  });
});

// User.requestPasswordReset(email)
// --------------------------------
//
// Sends a unique (or rather, randomized) token to the user in an email to be
// able to reset the password.
//
// ### Parameters
//
// * `email` (String) - The email of the user to reset the password.
//
// ### Returns
//
// A Promise that gets resolved after the email has been sent. It returns info
// about the email, which you can use to make sure the email was sent correctly.
// it is recommended that you
var passwordReset = config.get('env.passwordReset');
var transport     = require('bluebird').promisifyAll(config.get('env.email'));

UserSchema.static('requestPasswordReset', function (email) {
  // Find the user
  return this.findOne({email: email}).exec()
    .then(function (user) {
      if (!user) { return false; }
      // Set the token
      return user.setToken();
    })
    .then(function (user) {
      if (!user) { return false; }
      // Send the email
      return transport.sendMailAsync({
        to: user.email,
        subject: passwordReset.subject,
        text: require('util').format(passwordReset.text, user.email, user.token)
      });
    });
});

// User.resetPassword(token, email, password)
// ------------------------------------------
//
// Resets the password for a user as long as the token is the right one.
//
// ### Parameters
//
// * `token` (String) - The token given to the user in the email
// * `email` (String) - The user's email
// * `password` (String) - The user's new password
//
// ### Returns
//
// A Promise which returns the user if the reset was successful, or false if
// the user wasn't found or the token didn't match or was expired. Be sure to
// catch any validation errors for the password.
UserSchema.static('resetPassword', function (token, email, password) {
  return this.getByToken(token, {email: email}).then(function (user) {
    if (!user) { return false; }
    user.password  = password;
    user.lockUntil = undefined;
    user.attempts  = 0;
    return user.resetToken();
  });
});

// User.defaultUser(newUser)
// -------------------------
//
// Sets a default user, unless it already exists. Useful for when you want to
// start the project out with a user. Be sure to secure your data.
//
// ### Parameters
//
// * `newUser` (Object) - The user object to create. Must have these three
// properties:
//   * `email`
//   * `password`
//   * `role`
//
// ### Returns
//
// A Promise which returns the user that was created.
UserSchema.static('defaultUser', function (newUser) {
  var User = this;
  return User.findOne({email: newUser.email}).exec().then(function (user) {
    return user ? user : User.create(newUser);
  });
});

module.exports = UserSchema;
