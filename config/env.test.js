'use strict';

var RedisStore = require('connect-redis')(require('express-session'));

module.exports = {

  db: 'mongodb://localhost/DGM-Survey-Dispenser-test',
  port: '3001',
  session: {
    key: 'dgm-survey-dispenser.sid',
    store: false,/*new RedisStore({
      client: require('redis').createClient(6379, '127.0.0.1', {})
    }),*/
    secret: 'test secret',
    resave: true,
    saveUninitialized: true,
    unset: 'destroy'
  },
  email: require('nodemailer').createTransport(
    require('nodemailer-stub-transport')()
  ),
  passwordReset: {
    subject: 'Password Reset',
    text: [
      'A password reset request was made using your email.',
      'If this was you, then proceed to click on this link:',
      'http://localhost:3001/reset-password/%s/%s'
    ].join('\n')
  }
};
