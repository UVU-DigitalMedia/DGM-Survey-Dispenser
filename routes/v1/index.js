'use strict';

var router = module.exports = require('express').Router();

router.use('/boards', require('./boards'));
