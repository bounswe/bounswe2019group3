const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const writing_upload_storage = multer.diskStorage({
    destination: './../uploads/writings',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
});

const writing_upload = multer({ storage: writing_upload_storage });

/**
 * @api {post} /api/writing/ save writing
 * @apiName create,save new writing
 * @apiGroup writing
 * @apiPermission Writing
 * @apiParam (Request body) {Object} writing
 * @apiParam (Request body) {String} writing.text  
 * @apiParam (Request body) {File}   writing.image   
 * @apiParam (Request body) {String} writing.lang_abbr
 * @apiParam (Request body) {String} writing.title  (optional)
 * @apiParam (Request body) {String} writing.assignee assignee username (optional)
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
 
router.post("/", writing_upload.single('image'), (req, res, next) => {
    if (!req.session.user) {
        if(req.file) {
            fs.unlinkSync(req.file.path)
        }
        res.sendStatus(401);
        return;
    }
    let file_path = undefined;
    if(req.file) {
        file_path = 'api/uploads/writings/' + req.file.filename;
    }

    const db = req.db;
    db.Writing.create({
          written_by: req.session.user.username,
          assignee: req.body.assignee,
          text: req.body.text,
          image: file_path,
          title: req.body.title,
          lang_abbr: req.body.lang_abbr
        }).then(msg => {
          res.sendStatus(204);
    });
});


/**
 * @api {get} /api/writing/ list writing
 * @apiName list writings by (query) written_by and/or assignee
 * @apiGroup writing
 * @apiPermission Writing
 * @apiSuccess {Object[]} writings                   writings
 * @apiSuccess {Integer}  writings.writing_id        writing id
 * @apiSuccess {String}   writings.title             title
 * @apiSuccess {String}   writings.text              text
 * @apiSuccess {String}   writings.image             image
 * @apiSuccess {String}   writings.lang_abbr         lang_abbr
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
        attributes: ['writing_id', 'written_by', 'assignee', 'text', 'image', 'title', 'lang_abbr' ],
        where: where
    }).then(function (writings){
        res.send(writings);
    });
});

/**
 * @api {get} /api/writing/:id get writing by id
 * @apiName get writing by id
 * @apiGroup writing
 * @apiPermission Writing
 * @apiSuccess {Object}   writing                    writing
 * @apiSuccess {Integer}  writing.writing_id         writing id
 * @apiSuccess {String}   writing.title              title
 * @apiSuccess {String}   writing.text               text
 * @apiSuccess {String}   writing.image              image
 * @apiSuccess {String}   writing.lang_abbr          lang_abbr
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
        attributes: ['writing_id', 'written_by', 'assignee', 'text', 'image', 'title', 'lang_abbr' ],
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
 * @api {put} /api/writing/:id/assignee/:assignee_username set assignee
 * @apiName set assignee of the writing
 * @apiGroup writing
 * @apiPermission Writing
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


module.exports = {router};