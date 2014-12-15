'use strict';

var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.json({success: true});
});

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/student', require('./student'));
router.use('/question', require('./question'));

module.exports = router;
