
const router = require('express').Router()
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
 * @apiParam (Request body(JSON)) {Object}   user         user object
 * @apiParam (Request body(JSON)) {String}   user.bio       biography text
 * @apiParam (Request body(JSON)) {String}   user.avatar    
 */
router.post("/:username/", (req, res, next) => {
    res.sendStatus(501);
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
        attributes: ['id' ,'username', 'email', 'bio', 'avatar', 'rating'],
        where: { username: req.params.username }
    }).then(function (user) {
        res.send(user);
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
            where: { comment_to : user.id }
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
                belongs_to : user.id,
            }
        }).then(function (grades){
            res.send(grades);
        })
    });
});

module.exports = {router};