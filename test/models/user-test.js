'use strict';

var chai   = require('chai');
var expect = chai.expect;
var app    = require('../test-helpers/app');
var User   = require('../../models/user');

describe('User', function () {

  before(function () {
    return app.init();
  });

  var userInfo = {
    email: 'test@email.com',
    password: 'testpassword'
  };

  it('should hash given password', function () {
    return User
      .create(userInfo)
      .then(function (user) {
        expect(user.email).to.eql(userInfo.email);
        // TODO maybe there is a better way to check to see if it's hashed?
        expect(user.password).to.not.eql(userInfo.password);
      });
  });

  it('should authenticate given password', function () {
    var user;
    return User
      .findOne({email: userInfo.email})
      .then(function (foundUser) {
        user = foundUser;
        return expect(user.authenticate(userInfo.password))
          .to.eventually.eql(true);
      })
      .then(function () {
        return expect(user.authenticate(userInfo.password + '1'))
          .to.eventually.eql(false);
      });
  });

  it('should authenticate with given email and password', function () {
    return User.authenticate(userInfo.email, userInfo.password)
      .then(function (user) {
        expect(user.email).to.eql(userInfo.email);
      });
  });

  it('should throw error if user authentication didn\'t work', function () {
    return User.authenticate(userInfo.email, userInfo.password + '1')
      .then(function (user) {
        throw new Error('User should not have been found');
      })
      .catch(User.errors.WrongPassword, function (err) {
        expect(err).to.be.an.instanceof(User.errors.WrongPassword);
      });
  });

  it('should throw error if user wasn\'t found', function () {
    return User.authenticate('1' + userInfo.email, userInfo.password)
      .then(function (user) {
        console.log(user);
        throw new Error('User should not have been found');
      })
      .catch(User.errors.NotFound, function (err) {
        expect(err).to.be.an.instanceof(User.errors.NotFound);
      });
  });

  it('should not rehash unedited password', function () {
    var password;
    return User
      .findOne({email: userInfo.email})
      .then(function (user) {
        user.email = 'test2@email.com';
        userInfo.email = user.email;
        password = user.password;
        return user.save();
      })
      .then(function (user) {
        expect(user.email).to.eql(userInfo.email);
        expect(user.password).to.eql(password);
      });
  });

  it('should fail with invalid password (length)', function () {
    var password = '';
    for (var i = 1; i < User.passwordMinLength; i += 1) {
      password += String(i);
    }
    return User
      .create({email: 'test1@email.com', password: password})
      .catch(function (err) {
        expect(err.name).to.eql('SequelizeValidationError');
        expect(err.errors[0].message).to.eql(
          'Password must have between 8 and 255 characters'
        );
      })
      .then(function (user) {
        if (user && user.email) {
          throw new Error('Error should have happened');
        }
      });
  });

  it('should fail with invalid email', function () {
    return User
      .create({email: 'test1', password: '1234567890'})
      .catch(function (err) {
        expect(err.name).to.eql('SequelizeValidationError');
        expect(err.errors[0].message).to.eql('Must be a valid email');
      })
      .then(function (user) {
        if (user && user.email) {
          throw new Error('Error should have happened');
        }
      });
  });

  it('should fail with duplicate email', function () {
    return User
      .create(userInfo)
      .catch(function (err) {
        expect(err.name).to.eql('SequelizeUniqueConstraintError');
        expect(err.errors[0].message).to.eql('email must be unique');
      })
      .then(function (user) {
        if (user && user.email) {
          throw new Error('Error should have happened');
        }
      });
  });

});
