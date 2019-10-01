
const router = require('express').Router()

let Users = [{"id": "asdkalk", "username": "sam", "password": "dem"}]

/**
 * @api {post} /api/auth/login login
 * @apiName login
 * @apiGroup auth
 * @apiPermission none
 * @apiParam {String} username username or email of the user.
 * @apiParam {String} password password of the user.
 */

router.post("/login", (req, res, next) => {
    if(!req.body.username || !req.body.password){
        res.sendStatus(400);
    }else {
        // TODO: CHECK DATABASE
        let user = Users.filter((user) => {
            return user.username === req.body.username && user.password === req.body.password;
        })[0];

        if(user) {
            req.session.user = user
            delete user.password
            res.status(200).send(user);
        }else {
            res.sendStatus(400);
        }
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