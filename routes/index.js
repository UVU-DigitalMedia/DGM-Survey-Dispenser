'use strict';

var router = module.exports = require('express').Router();

router.use('/v1', require('./v1'));

router.use(function (req, res, next) {
  var error = new Error('The Resource you requested was not found');
  error.name = 'NotFound';
  next(error);
});

router.use(function (err, req, res, next) {
  /* istanbul ignore next: ideally, we catch all errors */
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
    case 'Forbidden':
      res.status(403);
      res.json({
        error: err.name,
        message: err.message
      });
      break;
    case 'NotFound':
      res.status(404);
      res.json({
        error: err.name,
        message: err.message
      });
      break;
    /* istanbul ignore next: ideally, we catch all errors */
    default:
      next(err);
      break;
  }
});

/* istanbul ignore next: ideally , we catch all errors */
router.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({
    error: 'Server Error',
    message: 'The server encountered an error'
  });
});

module.exports = router;
