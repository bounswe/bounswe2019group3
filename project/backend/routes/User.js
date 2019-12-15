
const router = require('express').Router();
const multer = require('multer');
const avatar_upload = multer({dest: '/backend/uploads/avatars'});
const fs = require('fs');
const path = require('path');

/**
 * @api {get} /api/user/ returns all users
 * @apiName get all users
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object}   user                              user object
 * @apiSuccess {String}   user.username                     username
 */
router.get("/", (req, res, next) => {
    const db = req.db;
    db.User.findAll({
        attributes: ['username'],
    }).then(function (users) {
        res.send(users);
    });
});

/**
 * @api {post} /api/user/:username update user details
 * @apiName update user details
 * @apiGroup user
 * @apiPermission User
 * @apiParam (Request body(JSON)) {Object}  user         user object
 * @apiParam (Request body(JSON)) {String}  user.bio     biography text
 * @apiParam (Request body(JSON)) {File}    user.avatar  avatar image file  
 */
router.post("/:username/", avatar_upload.single('avatar'), (req, res, next) => {
    if(!req.session.user || req.session.user.username !== req.params.username){
        if(req.file) {
            fs.unlinkSync(req.file.path)
        }
        res.sendStatus(403);
        return;
    }
    let file_path = undefined;
    if(req.file) {
        file_path = "/uploads/avatars/" + req.session.user.username + path.extname(req.file.originalname);
        fs.renameSync(req.file.path, "/backend/" + file_path);
    }
    const db = req.db;
    const update = {};
    if(req.body.bio){
        update.bio = req.body.bio;
    }
    if(file_path){
        update.avatar = "api" + file_path;
    }
    db.User.update(
        update,
        {
            returning: true,
            where: {username: req.session.user.username} 
        }
      ).then(function([ rowsUpdate, [updated_user] ]) {
        res.send(updated_user);
      });
});

/**
 * @api {get} /api/user/:username returns user details
 * @apiName returns user details
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object}   user                              user object
 * @apiSuccess {String}   user.username                     username
 * @apiSuccess {String}   user.email                        email
 * @apiSuccess {String}   user.bio                          biography text
 * @apiSuccess {String}   user.avatar                       avatar url
 * @apiSuccess {Float}    user.rating                       rating from comments
 */
router.get("/:username/", (req, res, next) => {
    const db = req.db;
    db.User.findOne({
        attributes: ['username', 'email', 'bio', 'avatar', 'rating'],
        where: { username: req.params.username }
    }).then(function (user) {
        res.send(user);
    });
});

/**
 * @api {post} /api/user/:username/comments/ create comment for username
 * @apiName create new comment
 * @apiGroup user
 * @apiPermission User
 * @apiParam (Request body(JSON)) {Object} comment
 * @apiParam (Request body(JSON)) {String} comment.text  text
 * @apiParam (Request body(JSON)) {Integer} comment.rating   rating (1,2,3,4,5)
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
 
router.post("/:username/comments/", (req, res, next) => {
    if (!req.session.user) {
        res.sendStatus(401);
        return;
    }
    const db = req.db;
    db.User.findOne({
        attributes: ["username"],
        where: { username: req.params.username }
      }).then(user => {
        if (!user) {
          res.sendStatus(400);
          return;
        }
        db.Comment.create({
          comment_to: req.params.username,
          rating: req.body.rating,
          text: req.body.text,
          comment_by: req.session.user.username,
          new: true
        }).then(msg => {
          res.sendStatus(204);
        });
      });
    });


/**
 * @api {get} /api/user/:username/comments returns user comments
 * @apiName user comments
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object[]} comments                     comments
 * @apiSuccess {String}   comments.text                comment text
 * @apiSuccess {String}   comments.rating              comment rating
 * @apiSuccess {String}   comments.comment_by          author of comment
 * @apiSuccess {String}   comments.comment_to          target of comment
 * @apiSuccess {String}   comments.createdAt           creation time of comment 
 */
router.get("/:username/comments/", (req, res, next) => {
    const db = req.db;
    db.User.findOne({
        where: { username: req.params.username },
    }).then(function (user) {
        db.Comment.findAll({
            attributes: ['text', 'rating', 'comment_by', 'comment_to', 'createdAt' ],
            where: { comment_to : user.username }

        }).then(function (comments){
            res.send(comments);
        })
    });
});

/**
 * @api {get} /api/user/:username/language/level returns user language level details
 * @apiName user language level details
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object[]} language_levels              language levels
 * @apiSuccess {String}   language_levels.lang_abbr    language abbr
 * @apiSuccess {String}   language_levels.grade        language level
 */
router.get("/:username/language/level", (req, res, next) => {
    const db = req.db;
    db.User.findOne({
        where: { username: req.params.username },
    }).then(function (user) {
        db.Level.findAll({
            attributes: ['lang_abbr', 'grade'],
            where: { 
                belongs_to : user.username,
            }
        }).then(function (grades){
            res.send(grades);
        })
    });
});

/**
 * @api {get} /api/user/:username/language/:language_abbr/progress returns language progress
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {String}     username        username of user
 * @apiSuccess {String}     lang_abbr       language abbreviation
 * @apiSuccess {Integer}    exercise_done   number of completed exercises
 * @apiSuccess {Integer}    exercises       number of all exercises
 * @apiSuccess {String}     updatedAt       last created or updated time
 */
router.get("/:username/language/:language_abbr/progress", 
  (req, res, next) => {
    const db = req.db;
    db.User.findOne({
        where: { username: req.params.username },
    }).then(function (user) {
        db.LanguageProgress.findAll({
            attributes: ['username', 'lang_abbr', 'exercise_done', 'exercises', 'updatedAt' ],
            where: { 
                username : user.username,
                lang_abbr : req.params.language_abbr
            }
        }).then(function ([progress]){
            if(progress){
                progress.exercise_done = progress.exercise_done.length
                res.send(progress);
            }
            else{
                let current_exercises = 0;
                db.Exercise.findAll({
                    where: {
                      lang_abbr: req.params.language_abbr
                    }
                  }).then(exercises => {
                    if (!exercises) {
                      res.sendStatus(400);
                    } else {
                      current_exercises = exercises.length;
                    }
                  }).then(function () {
                    db.LanguageProgress.create({
                        username: req.params.username,
                        lang_abbr: req.params.language_abbr,
                        exercise_done: [],
                        exercises: current_exercises,
                        createdAt:  new Date(),
                        updatedAt:  new Date()
                      }).then(function (new_progress) {
                        new_progress.exercise_done = 0;
                        res.send(new_progress);
                      });
                  })
                
            }
        })
    });
  }
);

/**
 * @api {get} /api/user/:username/exercise/:exercise_id/progress returns exercise progress
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {String}     username        username of user
 * @apiSuccess {Integer}    exercise_id     exercise id
 * @apiSuccess {Integer}    question_done   number of questions answered correctly
 * @apiSuccess {Integer}    questions       number of all questions
 * @apiSuccess {String}     updatedAt       last created or updated time
 */
router.get("/:username/exercise/:exercise_id/progress", 
  (req, res, next) => {
    const db = req.db;
    db.User.findOne({
        where: { username: req.params.username },
    }).then(function (user) {
        db.ExerciseProgress.findAll({
            attributes: ['username', 'exercise_id', 'question_done', 'questions', 'updatedAt' ],
            where: { 
                username    : user.username,
                exercise_id : req.params.exercise_id
            }
        }).then(function ([progress]){
            if(progress){
                res.send(progress);
            }
            else{
                let current_questions = 0;
                db.ExerciseQuestion.findAll({
                    where: {
                      exercise_id: req.params.exercise_id
                    }
                  }).then(questions => {
                    if (!questions) {
                      res.sendStatus(400);
                    } else {
                        current_questions = questions.length;
                    }
                  }).then(function () {
                    db.Exercise.findOne(
                        {
                          where: {
                            exercise_id : req.params.exercise_id
                          }
                        }
                      ).then(function (exercise) {
                        db.ExerciseProgress.create({
                            username: req.params.username,
                            exercise_id: req.params.exercise_id,
                            lang_abbr: exercise.lang_abbr,
                            question_done: 0,
                            questions: current_questions,
                            createdAt:  new Date(),
                            updatedAt:  new Date()
                          }).then(function (new_progress) {
                            res.send(new_progress);
                          });
                      })

                    
                  })
                
            }
        })
    });
  }
);


/**
 * @api {post} /api/user/:username/writing/ save writing by username
 * @apiName create,save new writing
 * @apiGroup user
 * @apiPermission User
 * @apiParam (Request body(JSON)) {Object} writing
 * @apiParam (Request body(JSON)) {String} writing.text  
 * @apiParam (Request body(JSON)) {String} writing.title  
 * @apiParam (Request body(JSON)) {String} writing.assignee assignee username
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
 
router.post("/:username/writing/", (req, res, next) => {
    if (!req.session.user) {
        res.sendStatus(401);
        return;
    }
    const db = req.db;
    db.User.findOne({
        attributes: ["username"],
        where: { username: req.params.username }
      }).then(user => {
        if (!user) {
          res.sendStatus(400);
          return;
        }
        db.Writing.create({
          written_by: req.params.username,
          assignee: req.body.assignee,
          text: req.body.text,
          new: true
        }).then(msg => {
          res.sendStatus(204);
        });
      });
    });


/**
 * @api {get} /api/user/:username/comments returns user comments
 * @apiName user comments
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object[]} comments                     comments
 * @apiSuccess {String}   comments.text                comment text
 * @apiSuccess {String}   comments.rating              comment rating
 * @apiSuccess {String}   comments.comment_by          author of comment
 * @apiSuccess {String}   comments.comment_to          target of comment
 * @apiSuccess {String}   comments.createdAt           creation time of comment 
 */
router.get("/:username/comments/", (req, res, next) => {
    const db = req.db;
    db.User.findOne({
        where: { username: req.params.username },
    }).then(function (user) {
        db.Comment.findAll({
            attributes: ['text', 'rating', 'comment_by', 'comment_to', 'createdAt' ],
            where: { comment_to : user.username }

        }).then(function (comments){
            res.send(comments);
        })
    });
});


module.exports = {router};