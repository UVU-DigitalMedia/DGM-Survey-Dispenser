'use strict';

var router = module.exports = require('express').Router();

router.use('/v1', require('./v1'));

router.use(function (req, res, next) {
  res.status(404).json({
    error: 'Not Found',
    message: 'The resource requested was not found'
  });
});

router.use(function (err, req, res, next) {
  if (!err || !err.name || !err.errors) { return next(err); }

  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400);
      res.json({
        error: 'Invalid Data',
        message: 'The data that was sent does not pass data validation',
        errors: err.errors
      });
      break;
    default:
      next(err);
      break;
  }
});

router.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({
    error: 'Server Error',
    message: 'The server encountered an error'
  });
});

module.exports = router;
