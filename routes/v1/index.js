'use strict';

var router = module.exports = require('express').Router();

router.use('/users', require('./users'));
router.use('/students', require('./students'));
