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
  if (!err || !err.name) { return next(err); }

  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400);
      res.json({
        error: 'Invalid Data',
        message: 'The data that was sent does not pass data validation',
        errors: err.errors
      });
      break;
    case 'Unauthorized':
      res.status(401);
      res.json({
        error: err.name,
        message: err.message
      });
      break;
    default:
      next(err);
      break;
  }
});

router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    error: 'Server Error',
    message: 'The server encountered an error'
  });
});

module.exports = router;
