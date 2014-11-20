'use strict';

var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/student', require('./student'));
router.use('/question', require('./question'));

module.exports = router;
