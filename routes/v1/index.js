'use strict';

var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/student', require('./student'));

module.exports = router;
