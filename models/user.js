'use strict';
/**
 * @module models/user
 * @class User
 * @classdesc The User model is used to give and restrict access to sepecific
 * parts of the application
 *
 * @requires core:util
 * @requires npm:sequelize
 * @requires lib/db
 * @requires lib/hash
 *
 * @see http://sequelize.readthedocs.org/en/latest/api/model/
 */

var util      = require('util');
var Sequelize = require('sequelize');
var db        = require('../lib/db');
var hash      = require('../lib/hash');

// Constants
var PASSWORD_MIN_LENGTH = 8;
var PASSWORD_MAX_LENGTH = 255;
var SALT_WORK_FACTOR    = 10;

var User = db.define('User', {
  /** @member {String} User#email - The user's email */
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: { msg: 'Must be a valid email' }
    }
  },
  /** @member {String} User#password - The user's hashed password */
  password: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH],
        msg: util.format(
          'Password must have between %s and %s characters',
          PASSWORD_MIN_LENGTH,
          PASSWORD_MAX_LENGTH
        )
      }
    }
  }
}, {
  hooks: {
    afterValidate: function (user) {
      if (!user.changed('password')) { return db.Promise.resolve(user); }

      return hash.hash(user.password, SALT_WORK_FACTOR)
        .then(function (hashedPassword) {
          user.password = hashedPassword;
          return user;
        });
    }
  },
  classMethods: {
    /**
     * @function User.authenticate
     * @description authenticates a user given an email and password
     *
     * @param {String} email - The user's email
     * @param {String} password - The user's unhashed password
     * @returns {Promise(REASONS|Boolean)} Returns the user object if found,
     * throws a reason if authentication failed.
     */
    authenticate: function (email, password) {
      var user;
      return User.findOne({where: {email: email}})
        .then(function (foundUser) {
          user = foundUser;
          if (!user) { throw new User.errors.NotFound(email); }
          return user.authenticate(password);
        })
        .then(function (isMatch) {
          if (!isMatch) { throw new User.errors.WrongPassword(); }
          return user;
        });
    }
  },
  instanceMethods: {
    /**
     * @function User#authenticate
     * @description authenticates a user given an unhashed password
     * @param {String} comparePassword - The unhashed password to check against
     * the already saved hashed password
     * @returns {Promise(Boolean)} A Promise that resolves to a Boolean,
     * isMatch. `true` if the passwords match, `false` if they don't
     */
    authenticate: function (comparePassword) {
      return hash.check(comparePassword, this.password);
    }
  }
});

/**
 * @member User.errors
 * @description an object containing the various reasons a user might fail
 * login.
 */
User.errors = {
  NotFound: function NotFound(email) {
    this.message = util.format('User not found: %s', email);
  },
  FailedAttempts: function FailedAttempts() {
    this.message = util.format('User has had too many failed login attempts');
  },
  WrongPassword: function WrongPassword() {
    this.message = util.format('User has entered the wrong password');
  }
};

Object.keys(User.errors).forEach(function (errorName) {
  User.errors[errorName].prototype = Object.create(Error.prototype);
});

module.exports = User;
