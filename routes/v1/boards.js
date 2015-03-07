'use strict';

var Board  = require('../../models/board');
var router = module.exports = require('express').Router();

/**
 * @api {get} /api/v1/boards/colors Get all of the valid colors
 * @apiName GetBoardColors
 * @apiGroup Boards
 *
 * @apiSuccess {String[]} colors
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       "GREEN",
 *       "YELLOW",
 *       "ORANGE",
 *       "RED",
 *       "PURPLE",
 *       "BLUE",
 *       "SKY_BLUE",
 *       "LIME",
 *       "PINK",
 *       "BLACK",
 *       "NO_COLOR"
 *     ]
 */
router.get('/colors', function (req, res) {
  res.json(Board.colors);
});

router.route('/')
  /**
   * @api {get} /api/v1/boards Get all of the boards
   * @apiName GetBoards
   * @apiGroup Boards
   *
   * @apiSuccess {Object[]} boards
   * @apiSuccess {Number} boards.id
   * @apiSuccess {String} boards.name
   * @apiSuccess {Number} boards.order
   * @apiSuccess {String} boards.color
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "id": 1,
   *       "name": "Board Name",
   *       "order": 0,
   *       "color": "GREEN"
   *     }]
   */
  .get(function (req, res, next) {
    Board
      .findAll()
      .then(function (boards) {
        res.json(boards);
      })
      .then(null, next);
  })
  /**
   * @api {post} /api/v1/boards Create a new board
   * @apiName CreateBoard
   * @apiGroup Boards
   *
   * @apiParam {String} name           The name of the board
   * @apiParam {String} [color='BLUE'] One of the valid colors.
   *                                   @see GetBoardColors
   * @apiParam {Number} [order=0]      The order in which the board will appear
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *       "name": "Board Name",
   *       "color": "GREEN",
   *       "order": 1
   *     }
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 201 Created
   *     location: /api/v1/boards/23124342
   */
  .post(function (req, res, next) {
    Board
      .create(req.body)
      .then(function (board) {
        res.status(201);
        res.location(req.originalUrl + '/' + board.id);
        res.end();
      })
      .then(null, next);
  });

router.route('/:id')
  /**
   * @api {get} /api/v1/boards/:id Gets a single board
   * @apiName GetBoard
   * @apiGroup Boards
   *
   * @apiSuccess {Number} id
   * @apiSuccess {String} name
   * @apiSuccess {Number} order
   * @apiSuccess {String} color
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": 1,
   *       "name": "Board Name",
   *       "order": 0,
   *       "color": "GREEN"
   *     }
   */
  .get(function (req, res, next) {
    // Turn it into a number so Sequelize likes it
    var id = parseInt(req.params.id, 10) || null;
    Board
      .findOne(id)
      .then(function (board) {
        if (!board) { return next(); }
        res.status(200);
        res.json(board);
      })
      .then(null, next);
  })
  /**
   * @api {put} /api/v1/boards/:id Updates/Creates a single board
   * @apiName UpdateBoard
   * @apiGroup Boards
   *
   * @apiParam {String} name           The name of the board
   * @apiParam {String} [color='BLUE'] One of the valid colors.
   *                                   @see GetBoardColors
   * @apiParam {Number} [order=0]      The order in which the board will appear
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *       "name": "Board Name",
   *       "color": "GREEN",
   *       "order": 1
   *     }
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 201 Created
   *     location: /api/v1/boards/23124342
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 204 No Content
   */
  .put(function (req, res, next) {
    req.body.id = parseInt(req.params.id, 10) || null;
    Board
      .upsert(req.body)
      .then(function (inserted) {
        if (inserted) {
          res.status(201);
          res.location(req.originalUrl + '/' + req.body.id);
          res.end();
        } else {
          res.status(204);
          res.end();
        }
      })
      .then(null, next);
  })
  /**
   * @api {delete} /api/v1/boards/:id Deletes a single board
   * @apiName DeleteBoard
   * @apiGroup Boards
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 204 No Content
   */
  .delete(function (req, res, next) {
    Board
      .destroy({
        where: {
          id: req.params.id
        },
        limit: 1
      })
      .then(function (rowsAffected) {
        if (rowsAffected) {
          res.status(204);
          res.end();
        } else {
          next();
        }
      });
  })
  ;
