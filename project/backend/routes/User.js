
const router = require('express').Router()

router.get("/", (req, res, next) => {
    res.sendStatus(501);
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
    res.sendStatus(501);
});

/**
 * @api {get} /api/user/:username/comments returns user comments
 * @apiName user comments
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object[]} comments                     comments
 * @apiSuccess {String}   comments.rating              comment rating
 * @apiSuccess {String}   comments.text                comment text
 */
router.get("/:username/comment/", (req, res, next) => {
    res.sendStatus(501);
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
    res.sendStatus(501);
});

module.exports = {router};