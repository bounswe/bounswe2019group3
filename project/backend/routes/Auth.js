
const router = require('express').Router()
const crypto = require('crypto');

/**
 * @api {post} /api/auth/signup signup
 * @apiName signup
 * @apiGroup auth
 * @apiPermission none
 * @apiParam (Request body(JSON)) {String} username 
 * @apiParam (Request body(JSON)) {String} email 
 * @apiParam (Request body(JSON)) {String} password 
 */

router.post("/signup", (req, res, next) => {
    if(req.session.user || !req.body.username || !req.body.email || !req.body.password){
        res.sendStatus(400);
    }else {
        const db = req.db;
        db.Auth.findOne({
            where: db.Sequelize.or(
                { username: req.body.username },
                { email: req.body.email }
            )
        })
        .then((user) => {
            if(user){
                res.sendStatus(400);
            }else {
                db.Auth.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: crypto.createHash('md5').update(req.body.password).digest('hex'),
                    role: "USER"
                })
                .then((user) => {
                    req.session.user = user
                    res.sendStatus(204);
                });
            }
        });
    }
});

/**
 * @api {post} /api/auth/login login
 * @apiName login
 * @apiGroup auth
 * @apiPermission none
 * @apiParam (Request body(JSON)) {String} id username or email of the user.
 * @apiParam (Request body(JSON)) {String} password password of the user.
 */

router.post("/login", (req, res, next) => {
    if(req.session.user || !req.body.id || !req.body.password){
        res.sendStatus(400);
    }else {
        const db = req.db;
        db.Auth.findOne({
            where: db.Sequelize.or(
                { username: req.body.id },
                { email: req.body.id }
            )
        })
        .then((user) => {
            const password_hash = crypto.createHash('md5').update(req.body.password).digest('hex');
            if(user && user.password === password_hash) {
                req.session.user = user
                user.password = undefined;
                res.status(200).send(user);
            }else {
                res.sendStatus(400);
            }
        });
    }
});

/**
 * @api {post} /api/auth/logout logout
 * @apiName logout
 * @apiGroup auth
 * @apiPermission User
 */

router.post("/logout", (req, res, next) => {
    if(!req.session.user) {
        res.sendStatus(400);
    }else {
        req.session.destroy(() => {
            res.sendStatus(204);
        });
    }
});

module.exports = {router};