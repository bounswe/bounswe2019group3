const router = require('express').Router();
const multer = require('multer');
const avatar_upload = multer({dest: '/backend/uploads/avatars'});
const fs = require('fs');
const path = require('path');

/**
 * @api {post} /api/writing/ save writing
 * @apiName create,save new writing
 * @apiGroup user
 * @apiPermission User
 * @apiParam (Request body(JSON)) {Object} writing
 * @apiParam (Request body(JSON)) {String} writing.text  
 * @apiParam (Request body(JSON)) {String} writing.title  (optional)
 * @apiParam (Request body(JSON)) {String} writing.assignee assignee username (optional)
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
 
router.post("/", (req, res, next) => {
    if (!req.session.user) {
        res.sendStatus(401);
        return;
    }
    const db = req.db;
    db.Writing.create({
          written_by: req.session.user.username,
          assignee: req.body.assignee,
          text: req.body.text,
          title: req.body.title
        }).then(msg => {
          res.sendStatus(204);
    });
});


/**
 * @api {get} /api/writing/ list writing
 * @apiName list writings by (query) written_by and/or assignee
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object[]} writings                   writings
 * @apiSuccess {Integer}  writings.writing_id        writing id
 * @apiSuccess {String}   writings.title             title
 * @apiSuccess {String}   writings.text              text
 * @apiSuccess {String}   writings.written_by        author of writing
 * @apiSuccess {String}   writings.assignee          assignee
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
router.get("/", (req, res, next) => {
    if (!req.query.written_by && !req.query.assignee){
        res.sendStatus(400);
        return;
    }
    if (!req.session.user) {
        res.sendStatus(401);
        return;
    }
    const username = req.session.user.username;
    if(req.query.written_by != username && req.query.assignee != username){
        res.sendStatus(403);
        return;
    }
    let where = {};
    if(req.query.written_by){
        where.written_by = req.query.written_by;
    }
    if(req.query.assignee){
        where.assignee = req.query.assignee;
    }
    const db = req.db;
    db.Writing.findAll({
        attributes: ['writing_id', 'written_by', 'assignee', 'text', 'title' ],
        where: where
    }).then(function (writings){
        res.send(writings);
    });
});

/**
 * @api {get} /api/writing/:id get writing by id
 * @apiName get writing by id
 * @apiGroup user
 * @apiPermission User
 * @apiSuccess {Object}   writing                    writing
 * @apiSuccess {Integer}  writing.writing_id         writing id
 * @apiSuccess {String}   writing.title              title
 * @apiSuccess {String}   writing.text               text
 * @apiSuccess {String}   writing.written_by         author of writing
 * @apiSuccess {String}   writing.assignee           assignee
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 */
router.get("/:id", (req, res, next) => {
    if (!req.params.id){
        res.sendStatus(400);
        return;
    }
    if (!req.session.user) {
        res.sendStatus(401);
        return;
    }
    const username = req.session.user.username;
    const db = req.db;
    db.Writing.findOne({
        attributes: ['writing_id', 'written_by', 'assignee', 'text', 'title' ],
        where: {
            writing_id: req.params.id
        }
    }).then(function (writing){
        if(!writing){
            res.sendStatus(404);
        }else if(writing.written_by != username && writing.assignee != username){
            res.sendStatus(403);
        }else{
            res.send(writing);
        }
    });
});

/**
 * @api {get} /api/writing/:id/assignee set assignee
 * @apiName set assignee of the writing
 * @apiGroup user
 * @apiPermission User
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
router.put("/:id/assignee/:assignee_username", (req, res, next) => {
    if (!req.params.id || !req.params.assignee_username){
        res.sendStatus(400);
        return;
    }
    if (!req.session.user) {
        res.sendStatus(401);
        return;
    }
    const username = req.session.user.username;
    const db = req.db;
    db.Writing.findOne({
        attributes: ['writing_id', 'written_by', 'assignee', 'text', 'title' ],
        where: {
            writing_id: req.params.id
        }
    }).then(function (writing){
        if (!writing){
            res.sendStatus(404);
        }else if(writing.written_by != username){
            res.sendStatus(403);
        }else{
            writing.update({
                assignee: req.params.assignee_username
            }).then(() => {
                res.sendStatus(204);
            }).catch(() => {
                res.sendStatus(500);
            });
        }
    });
});

router.get("/:id/recommendation", (req, res, next) => {
    if (!req.params.id){
        res.sendStatus(400);
        return;
    }
    if (!req.session.user) {
        res.sendStatus(401);
        return;
    }
    const username = req.session.user.username;
    const db = req.db;
    db.Writing.findOne({
        attributes: ['writing_id', 'written_by', 'assignee', 'text', 'title' ],
        where: {
            writing_id: req.params.id
        }
    }).then(function (writings){
        if(writings.written_by != username){
            res.sendStatus(403);
        }else{
            //FILL HERE WITH THE RECOMMENDATION ALGORITHM  
        }
    });
});


module.exports = {router};