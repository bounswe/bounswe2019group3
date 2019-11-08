
const router = require('express').Router()

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
 *  *       {
 *              "username": "admin",
 *              "last_message": "welcome to bulingo",
 *              "nb_new_messages": 2,
 *              "last_message_date": "2013-10-20T11:10:04.222Z"
 *          }    
 *       ]
 *     }
 */
router.get('/', (req, res, next) => {
    res.sendStatus(501);
});

/**
 * @apiIgnore Not finished Method
 * @api {get} /api/chat/:username chat history with username
 * @apiName history with user
 * @apiGroup chat
 * @apiPermission user
 */
router.get('/:username', (req, res, next) => {
    res.sendStatus(501);
});


module.exports = {router};
