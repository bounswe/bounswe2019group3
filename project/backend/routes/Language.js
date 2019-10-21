
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

    if(!req.session.user){
        res.sendStatus(403);
    }
    else if(!req.params.language_abbr){
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
    if(!req.session.user){
        res.sendStatus(403);
    }
    else if(!req.params.language_abbr){
        res.sendStatus(400);
    } else {
        const db = req.db;
        let bad_req = false;
        for (let i = 0; i < req.body.length; i++) {
            if(req.body[i].question_id == ""||req.body[i].question_id == undefined){
                bad_req = true;
                break;
            }
        }
        if(bad_req){
            res.sendStatus(400);
        }
        else{
            db.ExamQuestion.findAll({
                where: db.Sequelize.or(
                    { 
                        lang_abbr: req.params.language_abbr
                    }
                )
            })
            .then((question) => {
                let counter = 0;
                let hashAnswers = {};
                question.forEach(q => {
                    hashAnswers[q.id] = q.answer_id;
                });
                for (let i = 0; i < req.body.length; i++) {
                    if(req.body[i].question_id>question[question.length - 1].id || req.body[i].question_id < question[0].id){
                        bad_req = true;
                        break;
                    }
                    if(hashAnswers[req.body[i].question_id]==req.body[i].choice_id){
                        counter ++;
                    }
                }
                if(bad_req){
                    res.sendStatus(400);
                }
                else {
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
                    db.User.findOne({
                        where: { username: req.session.user.username },
                    }).then(function (user) {
                        db.Level.findOne({
                            attributes: ['lang_abbr', 'grade'],
                            where: { 
                                belongs_to : user.username,
                                lang_abbr: req.params.language_abbr
                            }
                        }).then(function (prv_grade){
                            if(prv_grade){
                                db.Level.update({
                                    grade: grade,
                                    updatedAt:  new Date()
                                },
                                {where: {
                                    belongs_to:  user.username,
                                    lang_abbr: req.params.language_abbr,
                                }}
                                );
                            }
                            else{
                                db.Level.create({
                                    belongs_to: user.username,
                                    lang_abbr: req.params.language_abbr,
                                    grade: grade,
                                    createdAt:  new Date(),
                                    updatedAt:  new Date()
                                })
                            }
                        })
                    });
                    res.send({grade});
                }
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
