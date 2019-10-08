
const router = require('express').Router()

/**
 * @api {get} /api/languague/ returns available languagues
 * @apiName available_languages
 * @apiGroup language
 * @apiPermission none
 * @apiSuccess {Object[]} language       list of languages
 * @apiSuccess {String}   language.name  language name
 * @apiSuccess {String}   language.abbr  language abbreviation
 */
router.get('/', (req, res, next) => {
    res.sendStatus(501);
});

/**
 * @api {get} /api/languague/:language_abbr/exam/questions returns level determination exam questions
 * @apiName exam/questions
 * @apiGroup language
 * @apiPermission User
 * @apiSuccess {Object[]} questions                 list of exam questions
 * @apiSuccess {String}   questions.id              question id
 * @apiSuccess {String}   questions.desc            question description
 * @apiSuccess {Object[]} questions.choices         answer choices
 * @apiSuccess {Object} questions.choices.id     answer choices id
 * @apiSuccess {Object} questions.choices.desc   answer choices description
 */
router.get('/:language_abbr/exam/questions', (req, res, next) => {
    res.sendStatus(501);
});


/**
 * @api {post} /api/languague/:language_abbr/exam/evaluate evaluates level determination exam
 * @apiName exam/evaluate
 * @apiGroup language
 * @apiPermission User
 * @apiParam (Request body(JSON)) {Object[]} answers                    list of answers
 * @apiParam (Request body(JSON)) {String}   answers.question_id       question id
 * @apiParam (Request body(JSON)) {Object[]} answers.choices_id        choices id
 */
router.post('/:language_abbr/exam/evaluate', (req, res, next) => {
    res.sendStatus(501);
});

/**
 * @api {get} /api/languague/:language_abbr/excercise/excercise_type/ return all excercise of type
 * @apiGroup language
 * @apiPermission User
 */
router.get('/:language_abbr/excercise/excercise_type/', (req, res, next) => {
    res.sendStatus(501);
});

/**
 * @api {get} /api/languague/:language_abbr/excercise/excercise_type/:exersice_id/questions return the excercise
 * @apiGroup language
 * @apiPermission User
 */
router.get('/:language_abbr/excercise/excercise_type/:exersice_id/questions', (req, res, next) => {
    res.sendStatus(501);
});

/**
 * @api {post} /api/languague/:language_abbr/excercise/excercise_type/:exersice_id/questions evaluate the excercise
 * @apiGroup language
 * @apiPermission User
 */
router.post('/:language_abbr/excercise/excercise_type/:exersice_id/evaluate', (req, res, next) => {
    res.sendStatus(501);
});

module.exports = {router};