'use strict';

var Promise  = require('bluebird');
var inquirer = require('inquirer');
var User     = require('../models/user.js');

var prompt   = function (questions) {
  return new Promise(inquirer.prompt.bind(null, questions));
};

var userQuestions = [
  {
    name: 'email',
    message: 'Email?'
  },
  {
    type: 'password',
    name: 'password',
    message: 'Password?'
  }
];

module.exports = require('bluebird').resolve()
  .then(require('../init/models'))
  .then(require('../init/database'))
  .then(function () {
    console.log('Let\'s create the superuser');
    return prompt(userQuestions);
  })
  .then(function (user) {
    user.role = 'admin';
    return User.create(user);
  })
  .then(function () {
    console.log('Super user successfully created!');
  })
  .catch(function (err) {
    if (err.errors) {
      return err.errors.forEach(function (error) {
        console.log(error.message);
      });
    }
    console.log(err);
  })
  .then(function () {
    console.log('Waiting to shut connections to database...');
  });
