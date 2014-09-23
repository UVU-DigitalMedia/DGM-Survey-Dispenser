'use strict';
module.exports = {
  saltWorkFactor: 10,
  roles: ['user', 'admin'],
  accessLevels: {
    'user': ['user', 'admin'],
    'admin': ['admin']
  },
  maxFailedAttempts: 3,
  accountLockTime: 1 * 60 * 60 * 1000, // 1 hour
  passwordTokenLength: 40,
  passwordTokenExpire: 1 * 60 * 60 * 1000 // 1 hour
};
