const router = require("express").Router();

/**
 * @api {get} /api/language/ returns available languages
 * @apiName available_languages
 * @apiGroup language
 * @apiPermission none
 * @apiSuccess {Object[]} language       list of languages
 * @apiSuccess {String}   language.name  language name
 * @apiSuccess {String}   language.abbr  language abbreviation
 */
router.get("/", (req, res, next) => {
  const db = req.db;
  db.Language.findAll({
    attributes: ["abbr", "name"]
  }).then(function(language) {
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
router.get("/:language_abbr/exam/questions", (req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(403);
  } else if (!req.params.language_abbr) {
    res.sendStatus(400);
  } else {
    let db = req.db;
    db.Language.findOne({
      where: { abbr: req.params.language_abbr },
      include: [
        {
          model: db.ExamQuestion,
          as: "exam_questions",
          attributes: ["id", "desc"],
          separate: true,
          include: [
            { model: db.ExamChoice, as: "choices", attributes: ["id", "desc"] }
          ]
        }
      ]
    }).then(lang => {
      if (!lang) {
        res.sendStatus(400);
      } else {
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
router.post("/:language_abbr/exam/evaluate", (req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(403);
  } else if (!req.params.language_abbr) {
    res.sendStatus(400);
  } else {
    const db = req.db;
    let bad_req = false;
    for (let i = 0; i < req.body.length; i++) {
      if (
        req.body[i].question_id == "" ||
        req.body[i].question_id == undefined
      ) {
        bad_req = true;
        break;
      }
    }
    if (bad_req) {
      res.sendStatus(400);
    } else {
      db.ExamQuestion.findAll({
        where: db.Sequelize.or({
          lang_abbr: req.params.language_abbr
        })
      }).then(question => {
        let counter = 0;
        let hashAnswers = {};
        question.forEach(q => {
          hashAnswers[q.id] = q.answer_id;
        });
        for (let i = 0; i < req.body.length; i++) {
          if (
            req.body[i].question_id > question[question.length - 1].id ||
            req.body[i].question_id < question[0].id
          ) {
            bad_req = true;
            break;
          }
          if (hashAnswers[req.body[i].question_id] == req.body[i].choice_id) {
            counter++;
          }
        }
        if (bad_req) {
          res.sendStatus(400);
        } else {
          const success_rate = counter / question.length;
          let grade;
          if (success_rate == 0 || question.length == 0) {
            grade = "A1";
          } else if (success_rate <= 0.2) {
            grade = "A2";
          } else if (success_rate <= 0.4) {
            grade = "B1";
          } else if (success_rate <= 0.6) {
            grade = "B2";
          } else if (success_rate <= 0.8) {
            grade = "C1";
          } else if (success_rate == 1) {
            grade = "C2";
          }
          db.User.findOne({
            where: { username: req.session.user.username }
          }).then(function(user) {
            db.Level.findOne({
              attributes: ["lang_abbr", "grade"],
              where: {
                belongs_to: user.username,
                lang_abbr: req.params.language_abbr
              }
            }).then(function(prv_grade) {
              if (prv_grade) {
                db.Level.update(
                  {
                    grade: grade,
                    updatedAt: new Date()
                  },
                  {
                    where: {
                      belongs_to: user.username,
                      lang_abbr: req.params.language_abbr
                    }
                  }
                );
              } else {
                db.Level.create({
                  belongs_to: user.username,
                  lang_abbr: req.params.language_abbr,
                  grade: grade,
                  createdAt: new Date(),
                  updatedAt: new Date()
                });
              }
            });
          });
          res.send({ grade });
        }
      });
    }
  }
});

/**
 * @api {get} /api/language/:language_abbr/exercises return all exercise of type
 * @apiGroup language
 * @apiPermission User
 * @apiSuccess {Object[]} exercises                 exercises
 * @apiSuccess {Integer}   exercises.exersice_id              exercise id
 * @apiSuccess {String}   exercises.title            exercise title
 * @apiSuccess {String} exercises.language_abbr         exercise language abbreviation
 * @apiSuccess {Stirng} exercises.exercise_type    exercise exercise type
 * @apiSuccess {String} exercises.level   exercise level
 */
router.get("/:language_abbr/exercises", (req, res, next) => {
  let db = req.db;
  let likeOp = db.Sequelize.Op.like;
  let exercise_type = req.query.exercise_type;
  let level = req.query.level;
  if (exercise_type === undefined) {
    exercise_type = "%%";
  }
  if (level === undefined) {
    level = "%%";
  }
  db.Language.findOne({
    where: { abbr: req.params.language_abbr },
    include: [
      {
        model: db.Exercise,
        as: "exercises",
        attributes: [
          "exersice_id",
          "title",
          "language_abbr",
          "exercise_type",
          "level"
        ],
        where: {
          lang_abbr: req.params.language_abbr,
          exercise_type: {
            [likeOp]: exercise_type.toLowerCase()
          },
          level: {
            [likeOp]: level.toUpperCase()
          }
        },
        separate: true
      }
    ]
  }).then(lang => {
    if (!lang) {
      res.sendStatus(400);
    } else {
      res.status(200).send(lang.exercises);
    }
  });
});

/**
 * @api {get} /api/language/:language_abbr/exercise/:exersice_id/questions return the exercise
 * @apiGroup language
 * @apiPermission User
 * @apiSuccess (Request body(JSON)) {String} question_id                    question id
 * @apiSuccess (Request body(JSON)) {String} desc                    question description
 * @apiSuccess (Request body(JSON)) {String} media_url                    media url related to question (optional)
 * @apiSuccess (Request body(JSON)) {String} media_type                    media type related to question (optional)
 * @apiSuccess (Request body(JSON)) {String} media_start_time                    media start time related to question (optional)
 * @apiSuccess (Request body(JSON)) {String} media_end_time                    media end time related to question (optional)
 * @apiSuccess (Request body(JSON)) {Object[]} choices                     answer choices (optional: not available for writing)
 * @apiSuccess (Request body(JSON)) {String} choices.id                    choice id
 * @apiSuccess (Request body(JSON)) {String} choices.desc                    choice description
 */
router.get(
  "/:language_abbr/exercise/:exercise_id/questions",
  (req, res, next) => {
    let db = req.db;
    db.ExerciseQuestion.findAll({
      where: {
        exercise_id: req.params.exercise_id,
        lang_abbr: req.params.language_abbr
      },
      attributes: [
        "question_id",
        "desc",
        "media_url",
        "media_type",
        "media_start_time",
        "media_end_time"
      ],
      include: [
        {
          model: db.ExerciseChoice,
          as: "choices",
          attributes: ["choice_id", "desc"]
        }
      ]
    }).then(exercise => {
      if (!exercise) {
        res.sendStatus(400);
      } else {
        res.status(200).send(exercise);
      }
    });
  }
);

/**
 * @api {post} /api/language/:language_abbr/exercise/:exersice_id/evaluate evaluate the exercise
 * @apiGroup language
 * @apiPermission User
 * @apiParam {Object[]}   answers
 * @apiParam {Integer}   answers.question_id                      answer question id
 * @apiParam {Integer}   answers.choice_id                       answer choice id
 * @apiParam {String}   answers.text                              (optional: only available for writing)
 * @apiSuccess {Integer}   nb_correct_answers   number of correct answers
 * @apiSuccess {Integer}   nb_questions   number of questions
 * @apiSuccess {Object[]} answers                    media related to question (e.g. listening material) (optional)
 * @apiSuccess {Integer} answers.question_id                  question id
 * @apiSuccess {Integer} answers.choice_id                 correct choices id
 */
router.post(
  "/:language_abbr/exercise/:exercise_id/evaluate",
  (req, res, next) => {
    const db = req.db;
    let bad_req = false;
    for (let i = 0; i < req.body.length; i++) {
      if (
        req.body[i].question_id == "" ||
        req.body[i].question_id == undefined
      ) {
        bad_req = true;
        break;
      }
    }
    if (bad_req) {
      res.sendStatus(400);
    } else {
      db.ExerciseQuestion.findAll({
        where: db.Sequelize.or({
          lang_abbr: req.params.language_abbr,
          exercise_id: req.params.exercise_id
        })
      }).then(question => {
        let counter = 0;
        let hashAnswers = {};
        question.forEach(q => {
          hashAnswers[q.question_id] = q.answer_id;
        });
        for (let i = 0; i < req.body.length; i++) {
          if (hashAnswers[req.body[i].question_id] == req.body[i].choice_id) {
            counter++;
          }
        }
        let response = {};
        response.nb_correct_answers = counter;
        response.nb_questions = question.length;
        const keys = Object.keys(hashAnswers);
        const values = Object.values(hashAnswers);
        let answers = [];
        for (let i = 0; i < keys.length; i++) {
          answers[i] = {
            question_id: keys[i],
            choice_id: values[i]
          };
        }
        response.answers = answers;
        res.send(response);
      });
    }
  }
);

module.exports = { router };
