'use strict';

var router   = require('express').Router();
var Question = require('mongoose').model('StudentQuestion');
var auth     = require('rute')('middleware/auth');

/**
 * @api {get} /v1/question/types Get the question types
 * @apiName QuestionTypes
 * @apiGroup Question
 *
 * @apiExample Example usage:
 *    GET /v1/question/types
 *
 * @apiSuccess {Boolean} success When the request is successful.
 * @apiSuccess {Object} types The possible question types
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "types": {
 *        "multipleChoice": "Multiple Choice",
 *        "multipleCorrect": "Muliple Correct",
 *        "trueFalse": "True/False",
 *        "shortAnswer": "Short Answer",
 *        "essay": "Essay",
 *        "ordering": "Ordering"
 *      }
 *    }
 */
router.get('/types', function (req, res, next) {
  res.json({
    success: true,
    types: Question.types
  });
});

router.use(auth.hasAccess('admin'));

router.param('id', function (req, res, next, id) {
  Question.findById(id).exec().then(function (question) {
    req.question = question;
    next();
  });
});

router.route('/:id')
  /**
   * @api {get} /v1/question/:id Request Question information
   * @apiName GetQuestion
   * @apiGroup Question
   *
   * @apiParam {String} id The question's unique id
   * @apiSuccess {Boolean} success When the request is successful.
   * @apiSuccess {Object} question The question object.
   * @apiSuccess {String} question._id The question's unique id
   * @apiSuccess {String} question.label The internally used question label
   * @apiSuccess {String} question.question The question to be asked to the
   *   student
   * @apiSuccess {String} question.type One of the question types referenced at
   *   "Get the question types"
   * @apiSuccess {Date} question.createdAt The date the question was created
   * @apiSuccess {Date} question.updatedAt the date the question was updated
   * @apiSuccess {Object[]} question.choices The choices for the question if
   *   applicable
   * @apiSuccess {String} question.choices.label The label for the choice, as
   *   displayed to the student
   * @apiSuccess {String} question.choices.key The value of the choice. If an
   *   "other" option is specified, this should be 'other'
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "success": true,
   *       "question": {
   *         "id": "the-unique-id",
   *         "label": "The question label",
   *         "question": "What is the question?",
   *         "type": "multipleChoice",
   *         "choices": [
   *           {
   *             "label": "There is no question",
   *             "key": "noQuestion"
   *           },
   *           {
   *             "label": "Other",
   *             "key": "other"
   *           }
   *         ],
   *         "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
   *         "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
   *       }
   *     }
   */
  .get(function (req, res, next) {
    if (!req.question) { return next(); }
    res.json({success: true, question: req.question});
  })
  /**
   * @api {put} /v1/question/:id Update Question information
   * @apiName PutQuestion
   * @apiGroup Question
   *
   * @apiExample Example usage:
   *    PUT /v1/question/the-questions-id
   *    {
   *      "label": "New Label",
   *      "question": "New question?",
   *      "type": "multpleChoice",
   *      "choices": [{
   *        "label": "Answer Label",
   *        "key": "answerKey"
   *      }]
   *    }
   *
   * @apiParam {String} id The question's unique id
   * @apiSuccess {Boolean} success When the request is successful.
   * @apiSuccess {Object} question The question object.
   * @apiSuccess {String} question._id The question's unique id
   * @apiSuccess {String} question.label The internally used question label
   * @apiSuccess {String} question.question The question to be asked to the
   *   student
   * @apiSuccess {String} question.type One of the question types referenced at
   *   "Get the question types"
   * @apiSuccess {Date} question.createdAt The date the question was created
   * @apiSuccess {Date} question.updatedAt the date the question was updated
   * @apiSuccess {Object[]} question.choices The choices for the question if
   *   applicable
   * @apiSuccess {String} question.choices.label The label for the choice, as
   *   displayed to the student
   * @apiSuccess {String} question.choices.key The value of the choice. If an
   *   "other" option is specified, this should be 'other'
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "success": true,
   *       "question": {
   *         "id": "the-unique-id",
   *         "label": "The question label",
   *         "question": "What is the question?",
   *         "type": "multipleChoice",
   *         "choices": [
   *           {
   *             "label": "There is no question",
   *             "key": "noQuestion"
   *           },
   *           {
   *             "label": "Other",
   *             "key": "other"
   *           }
   *         ],
   *         "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
   *         "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
   *       }
   *     }
   */
  .put(function (req, res, next) {
    if (!req.question) { return next(); }
    delete req.body._id;
    Object.keys(req.body).map(function (key) {
      req.question[key] = req.body[key];
    });
    req.question.save(function (err, question) {
      if (err) { return next(err); }
      res.json({success: true, question: question});
    });
  })
  /**
   * @api {delete} /v1/question/:id Delete Question information
   * @apiName DeleteQuestion
   * @apiGroup Question
   *
   * @apiParam {Number} id Question's unique ID.
   * @apiSuccess {Boolean} success When the request is successful.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "success": true
   *     }
   */
  .delete(function (req, res, next) {
    if (!req.question) { return next(); }
    req.question.remove(function (err, question) {
      if (err) { return next(err); }
      res.json({success: true});
    });
  });

router.route('/')
  /**
   * @api {get} /v1/question Get all of the questions
   * @apiName Questions
   * @apiGroup Question
   *
   * @apiExample Example usage:
   *    GET /v1/question
   *
   * @apiParam {String} id The question's unique id
   * @apiSuccess {Boolean} success When the request is successful.
   * @apiSuccess {Object} questions The questions array.
   * @apiSuccess {String} questions._id The question's unique id
   * @apiSuccess {String} questions.label The internally used question label
   * @apiSuccess {String} questions.question The question to be asked to the
   *   student
   * @apiSuccess {String} questions.type One of the question types referenced at
   *   "Get the question types"
   * @apiSuccess {Date} questions.createdAt The date the question was created
   * @apiSuccess {Date} questions.updatedAt the date the question was updated
   * @apiSuccess {Object[]} questions.choices The choices for the question if
   *   applicable
   * @apiSuccess {String} questions.choices.label The label for the choice, as
   *   displayed to the student
   * @apiSuccess {String} questions.choices.key The value of the choice. If an
   *   "other" option is specified, this should be 'other'
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "success": true,
   *       "questions": [{
   *         "id": "the-unique-id",
   *         "label": "The question label",
   *         "question": "What is the question?",
   *         "type": "multipleChoice",
   *         "choices": [
   *           {
   *             "label": "There is no question",
   *             "key": "noQuestion"
   *           },
   *           {
   *             "label": "Other",
   *             "key": "other"
   *           }
   *         ],
   *         "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
   *         "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
   *       }]
   *     }
   */
  .get(function (req, res, next) {
    Question.find({}).exec().then(function (questions) {
      res.json({ success: true, questions: questions });
    });
  })
  /**
   * @api {post} /v1/question Create Question
   * @apiName PostQuestion
   * @apiGroup Question
   *
   * @apiExample Example usage:
   *    POST /v1/question
   *    {
   *      "label": "New Label",
   *      "question": "New question?",
   *      "type": "multpleChoice",
   *      "choices": [{
   *        "label": "Answer Label",
   *        "key": "answerKey"
   *      }]
   *    }
   *
   * @apiParam {String} id The question's unique id
   * @apiSuccess {Boolean} success When the request is successful.
   * @apiSuccess {Object} question The question object.
   * @apiSuccess {String} question._id The question's unique id
   * @apiSuccess {String} question.label The internally used question label
   * @apiSuccess {String} question.question The question to be asked to the
   *   student
   * @apiSuccess {String} question.type One of the question types referenced at
   *   "Get the question types"
   * @apiSuccess {Date} question.createdAt The date the question was created
   * @apiSuccess {Date} question.updatedAt the date the question was updated
   * @apiSuccess {Object[]} question.choices The choices for the question if
   *   applicable
   * @apiSuccess {String} question.choices.label The label for the choice, as
   *   displayed to the student
   * @apiSuccess {String} question.choices.key The value of the choice. If an
   *   "other" option is specified, this should be 'other'
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "success": true,
   *       "question": {
   *         "id": "the-unique-id",
   *         "label": "The question label",
   *         "question": "What is the question?",
   *         "type": "multipleChoice",
   *         "choices": [
   *           {
   *             "label": "There is no question",
   *             "key": "noQuestion"
   *           },
   *           {
   *             "label": "Other",
   *             "key": "other"
   *           }
   *         ],
   *         "createdAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),
   *         "updatedAt": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)
   *       }
   *     }
   */
  .post(function (req, res, next) {
    Question.create(req.body).then(function (question) {
      res.json({ success: true, question: question });
    }, function (err) {
      res.json({ success: false, err: err.message });
    });
  });

module.exports = router;
