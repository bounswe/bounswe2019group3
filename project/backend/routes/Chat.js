
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
 *          {
 *              "username": "admin",
 *              "last_message": "welcome to bulingo",
 *              "nb_new_messages": 2,
 *              "last_message_date": "2013-10-20T11:10:04.222Z"
 *          }    
 *       ]
 *     }
 */
router.get('/', (req, res, next) => {
    if(!req.session.user) {
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
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10
    })
    .then((messages) => {
        let response = {
            nb_new_messages: 0,
            history: []
        };
        let order = {}
        let index = 0;
        messages.forEach(msg => {
            const opposite_username = msg.to_username == username ? msg.from_username : msg.to_username;
            const is_new = msg.new && msg.to_username == username;
            if(!(opposite_username in order)){
                order[opposite_username] = index;
                index += 1;
                response.history[order[opposite_username]] = {
                    username: opposite_username,
                    last_message: msg.message,
                    last_message_date: msg.createdAt,
                    nb_new_messages: 1 * is_new,
                }
            }else{
                response.history[order[opposite_username]].nb_new_messages += 1 * is_new;
            }
            response.nb_new_messages += 1 * is_new;
        });
        res.status(200).send(response);
    });
});

/**
 * @apiIgnore Not finished Method
 * SABRİ
 * https://github.com/expressjs/express-paginate
 * PAGINATION 0(sonuncu) -> 10 tane ver yani [0,10]
 * req.body.skip(0), req.body.limit(10) 0,10 load more 10-20 load more 20-30
 * select * from message where to=samet and  from=berkay orderby date; [skip, limit] 
 * seçilenlerin hepsi için new=false
 * @api {get} /api/chat/:username chat history with username
 * @apiName history with user
 * @apiGroup chat
 * @apiPermission user
 */
router.get('/:username', (req, res, next) => {
    res.sendStatus(501);
});

/**
 * @apiIgnore Not finished Method
 * BERKAY : insert message to table(db)
 * message: req.body.message, 
 * from_username: req.session.user.username
 * to_username: req.params.username
 * req.body.message boş mu
 * req.session.user == undefined : 400
 * to_username exist? 400
 * if (req.session.user == undefined){
 * res.sendStatus(400);
 * return;
 * }
 *  if (req.body.message boş){
 * res.sendStatus(400);
 * return;
 * }
    db.Message.create({
                    message: req.body.message,
                    from_username: req.session.user.username,
                    to_username: req.params.username,
                    new: true
                })
 * res.sendStatus(204); // OK ama bir şey dönmüyorum 
 * @api {get} /api/chat/:username chat history with username
 * @apiName history with user
 * @apiGroup chat
 * @apiPermission user
 */
router.post('/:username', (req, res, next) => {
    res.sendStatus(501);
});


module.exports = {router};
