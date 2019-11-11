const router = require("express").Router();

/**
 * @api {get} /api/chat/ general chat history
 * @apiName history
 * @apiGroup chat
 * @apiPermission user
 * @apiSuccess {Object}     chat                            chat
 * @apiSuccess {Integer}    chat.nb_new_messages            number of new messages (all)
 * @apiSuccess {Object[]}   chat.history                    chat history with all users (ordered by date)
 * @apiSuccess {String}     chat.history.username           username
 * @apiSuccess {String}     chat.history.last_message       last message
 * @apiSuccess {Integer}    chat.history.nb_new_messages    number of new messages from that user
 * @apiSuccess {String}     chat.history.last_message_date  date of the last message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "nb_new_messages": 3,
 *       "history": [
 *          {
 *              "username": "user",
 *              "last_message": "hello world",
 *              "nb_new_messages": 1,
 *              "last_message_date": "2013-10-21T13:28:06.419Z"
 *          },
 *          {
 *              "username": "admin",
 *              "last_message": "welcome to bulingo",
 *              "nb_new_messages": 2,
 *              "last_message_date": "2013-10-20T11:10:04.222Z"
 *          }
 *       ]
 *     }
 */
router.get("/", (req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(400);
    return;
  }
  const username = req.session.user.username;
  const db = req.db;
  db.Message.findAll({
    where: db.Sequelize.or(
      { to_username: username },
      { from_username: username }
    ),
    order: [["id", "DESC"]],
    limit: 10
  }).then(messages => {
    let response = {
      nb_new_messages: 0,
      history: []
    };
    let order = {};
    let index = 0;
    messages.forEach(msg => {
      const opposite_username =
        msg.to_username == username ? msg.from_username : msg.to_username;
      const is_new = msg.new && msg.to_username == username;
      if (!(opposite_username in order)) {
        order[opposite_username] = index;
        index += 1;
        response.history[order[opposite_username]] = {
          username: opposite_username,
          last_message: msg.message,
          last_message_date: msg.createdAt,
          nb_new_messages: 1 * is_new
        };
      } else {
        response.history[order[opposite_username]].nb_new_messages +=
          1 * is_new;
      }
      response.nb_new_messages += 1 * is_new;
    });
    res.status(200).send(response);
  });
});

/**
 * @api {get} /api/chat/:username/:skip?/:limit? chat history with username
 * @apiName history with user
 * @apiGroup chat
 * @apiPermission user
 * @apiParam (URL) {String} username                        opponent user's username
 * @apiParam (URL) {String} skip                            number of messages to skip
 * @apiParam (URL) {String} limit                           number of messages to return
 * @apiSuccess {Object[]} messages                          list of messages
 * @apiSuccess {String}   messages.to_username              message receiver
 * @apiSuccess {String}   messages.from_username            message sender
 * @apiSuccess {String}   messages.message                  message text
 * @apiSuccess {Boolean}  messages.new                      message is read boolean
 */
router.get("/:username/:skip?/:limit?", (req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(401);
  } else {
    const db = req.db;
    const Op = db.Sequelize.Op;
    let skip = req.params.skip || req.body.skip;
    let limit = req.params.limit || req.body.limit;
    if (skip === undefined || String(skip).match(/^\d+$/) === null) skip = 0;
    if (limit === undefined || String(limit).match(/^\d+$/) === null)
      limit = 10;
    else if (limit > 20) limit = 20;
    db.Message.findAll({
      where: {
        [Op.or]: [
          {
            to_username: {
              [Op.eq]: req.session.user.username
            },
            from_username: {
              [Op.eq]: req.params.username
            }
          },
          {
            to_username: {
              [Op.eq]: req.params.username
            },
            from_username: {
              [Op.eq]: req.session.user.username
            }
          }
        ]
      },
      offset: skip,
      limit: limit,
      order: [["id", "ASC"]]
    }).then(messages => {
      if (messages.length > 0)
        db.Message.update(
          {
            new: false,
            updatedAt: new Date()
          },
          {
            where: {
              id: {
                [Op.lte]: messages[messages.length - 1].id
              },
              to_username: {
                [Op.eq]: req.session.user.username
              },
              from_username: {
                [Op.eq]: req.params.username
              }
            }
          }
        );
      res.send(messages);
    });
  }
});

/**
 * @api {post} /api/chat/:username create new message for username
 * @apiName create new message
 * @apiGroup chat
 * @apiPermission user
 * @apiParam (Request body(JSON)) {Object} body
 * @apiParam (Request body(JSON)) {String} body.message message text
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 */
router.post("/:username", (req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(401);
    return;
  }
  if (!req.body.message) {
    res.sendStatus(400);
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
    db.Message.create({
      message: req.body.message,
      from_username: req.session.user.username,
      to_username: req.params.username,
      new: true
    }).then(msg => {
      res.sendStatus(204);
    });
  });
});

module.exports = { router };
