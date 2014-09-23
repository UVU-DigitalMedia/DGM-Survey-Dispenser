'use strict';

var RedisStore = require('connect-redis')(require('express-session'));

module.exports = {

  db: 'mongodb://localhost/DGM-Survey-Dispenser',
  port: '3000',
  session: {
    key: 'DGM-Survey-Dispenser.sid',
    store: false,/*new RedisStore({
      client: require('redis').createClient(6379, '127.0.0.1', {})
    }),*/
    secret: 'change this secret',
    resave: true,
    saveUninitialized: true,
    unset: 'destroy'
  },
  email: require('nodemailer').createTransport({
    service: 'Gmail',
    auth: {
      user: 'gmail.user@gmail.com',
      pass: 'userpass'
    }
  }),
  passwordReset: {
    subject: 'Password Reset',
    text: [
      'A password reset request was made using your email.',
      'If this was you, then proceed to click on this link:',
      'http://localhost:3000/reset-password/%s/%s'
    ].join('\n')
  }
};
