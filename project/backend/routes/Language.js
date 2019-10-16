
const router = require('express').Router()

/**
 * @api {get} /api/language/ returns available languages
 * @apiName available_languages
 * @apiGroup language
 * @apiPermission none
 * @apiSuccess {Object[]} language       list of languages
 * @apiSuccess {String}   language.name  language name
 * @apiSuccess {String}   language.abbr  language abbreviation
 */
router.get('/', (req, res, next) => {
    const db = req.db;
    db.Language.findAll({
        attributes: ['abbr','name']
    }).then(function (language) {
        res.send(language);
    });
});

/**
 * @api {get} /api/language/:language_abbr/exam/questions returns level determination exam questions
 * @apiName exam/questions
 * @apiGroup language
 * @apiPermission User
 * @apiSuccess {Object[]} questions                 list of exam questions
 * @apiSuccess {Integer}   questions.id              question id
 * @apiSuccess {String}   questions.desc            question description
 * @apiSuccess {Object[]} questions.choices         answer choices
 * @apiSuccess {Integer} questions.choices.id     answer choices id
 * @apiSuccess {String} questions.choices.desc   answer choices description
 */
router.get('/:language_abbr/exam/questions', (req, res, next) => {
    if(!req.params.language_abbr){
        res.sendStatus(400);
    }else{
        let db = req.db;
        db.Language.findOne( { 
            where: { abbr: req.params.language_abbr },
            include: [{
                model: db.ExamQuestion,
                as: 'exam_questions',
                attributes: ['id', 'desc'],
                separate: true,
                include: [ {model: db.ExamChoice, as: 'choices', attributes: ['id', 'desc']} ]
            }]
        })
        .then((lang) => {
            if(!lang){
                res.sendStatus(400);
            }else{
                res.status(200).send(lang.exam_questions);
            }
        });
    }
});


/**
 * @api {post} /api/language/:language_abbr/exam/evaluate evaluates level determination exam
 * @apiName exam/evaluate
 * @apiGroup language
 * @apiPermission User
 * @apiParam (Request body(JSON)) {Object[]} answers                    list of answers
 * @apiParam (Request body(JSON)) {Integer}   answers.question_id       question id
 * @apiParam (Request body(JSON)) {Integer} answers.choices_id        choices id
 * @apiSuccess {String}   grade  result of evaluation
 */
router.post('/:language_abbr/exam/evaluate', (req, res, next) => {
    if(!req.params.language_abbr){
        res.sendStatus(400);
    } else {
        const db = req.db;
        let question_id_array = new Array();
        let choice_id_array = new Array();
        let bad_req = false;
        for (let index = 0; index < req.body.length; index++) {
            if(req.body[index].question_id == ""||req.body[index].question_id == undefined){
                bad_req = true;
                break;
            }
            else{
                question_id_array[index] = req.body[index].question_id;
                choice_id_array[index] = req.body[index].choice_id;    
            }
        }
        if(bad_req){
            res.sendStatus(400);
        }
        else{
            db.ExamQuestion.findAll({
                where: db.Sequelize.or(
                    { 
                        id: question_id_array,
                    }
                )
            })
            .then((question) => {
                let counter = 0;
                let hashAnswers = {};
                question.forEach(q => {
                    hashAnswers[q.id] = q.answer_id;
                });
                console.log(hashAnswers);
                for (let i = 0; i < question_id_array.length; i++) {
                    if(hashAnswers[question_id_array[i]]==choice_id_array[i]){
                        counter ++;
                    }
                }
                const success_rate = counter / question.length;
                let grade;
                if (success_rate==0 || question.length == 0) {
                    grade = 'A1'
                }
                else if (success_rate<=0.2) {
                    grade = 'A2'
                }
                else if (success_rate<=0.4) {
                    grade = 'B1'
                }
                else if (success_rate<=0.6) {
                    grade = 'B2'
                }
                else if (success_rate<=0.8) {
                    grade = 'C1'
                }
                else if (success_rate==1) {
                    grade = 'C2'
                }
                res.send({grade});
        });
        }
       
    }
    
});

/**
 * @api {get} /api/language/:language_abbr/excercise/excercise_type/ return all excercise of type
 * @apiGroup language
 * @apiPermission User
 */
router.get('/:language_abbr/excercise/excercise_type/', (req, res, next) => {
    res.sendStatus(501);
});

/**
 * @api {get} /api/language/:language_abbr/excercise/excercise_type/:exersice_id/questions return the excercise
 * @apiGroup language
 * @apiPermission User
 */
router.get('/:language_abbr/excercise/excercise_type/:exersice_id/questions', (req, res, next) => {
    res.sendStatus(501);
});

/**
 * @api {post} /api/language/:language_abbr/excercise/excercise_type/:exersice_id/questions evaluate the excercise
 * @apiGroup language
 * @apiPermission User
 */
router.post('/:language_abbr/excercise/excercise_type/:exersice_id/evaluate', (req, res, next) => {
    res.sendStatus(501);
});

module.exports = {router};
