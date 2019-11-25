const router = require("express").Router();

const axios = require('axios');

let get_related_keywords = (text) => {
    return axios.get('https://api.datamuse.com/words?max=10&ml=' + text)
        .then(response => response.data.map((obj) => obj.word));
};

let search_user = (db, text, related_keywords=[]) => {
    let words = [text, ...related_keywords].map((value) => '%' + value.toLowerCase() + '%');
    return db.User.findAll({
        attributes: ['username'],
        where: db.Sequelize.or(
            {
                username: {
                    [db.Sequelize.Op.iLike]: { [db.Sequelize.Op.any]: words }
                }
            },
            {
                bio: {
                    [db.Sequelize.Op.iLike]: { [db.Sequelize.Op.any]: words }
                }
            }
        )
    });
};

let search_exercise = (db, text, related_keywords=[], lang_abbr=null, exercise_type=null, level=null) => {
    let words = [text, ...related_keywords].map((value) => '%' + value.toLowerCase() + '%');
    let context_cond = db.Sequelize.or({
        title: {
            [db.Sequelize.Op.iLike]: { [db.Sequelize.Op.any]: words }
        }
    },
    {
        tags: {
            [db.Sequelize.Op.iLike]: { [db.Sequelize.Op.any]: words }
        }
    });
    let where_conds = [context_cond]
    if (lang_abbr){
        where_conds.push({
            lang_abbr: lang_abbr
        });
    }
    if (exercise_type){
        where_conds.push({
            exercise_type: exercise_type
        });
    }
    if (level){
        where_conds.push({
            level: level
        });
    }
    where_conds = db.Sequelize.and(where_conds);
    return db.Exercise.findAll({
        attributes: ['exercise_id', 'title', 'lang_abbr', 'exercise_type', 'level', 'tags'],
        where: where_conds
    });
};

/**
 * @api {get}  /api/search/                                 search
 * @apiName search
 * @apiGroup search
 * @apiPermission None
 * @apiParam (URL) {String} text                            text to be searched
 * @apiParam (URL) {String} type                            what type of data to be searched (exercise/user)
 * @apiParam (URL) {String} lang_abbr                       lang_abbr (exercise)
 * @apiParam (URL) {String} level                           level (exercise)
 * @apiParam (URL) {String} exercise_type                   exercise_type (exercise)
 * @apiSuccess {Object[]}   result                          result array
 * @apiSuccess {String}     result.type                     type of data
 * @apiSuccess {String}     result.username                 username of the user (optional: only for user type)
 * @apiSuccess {Integer}    result.exersice_id              id of the exercise (optional: only for exercise)
 * @apiSuccess {String}     result.title                    title of the exercise (optional: only for exercise)
 * @apiSuccess {String}     result.lang_abbr                language of the exercise (optional: only for exercise)
 * @apiSuccess {String}     result.exercises_type           type of the exercise (optional: only for exercise)
 * @apiSuccess {Integer}    result.level                    level of the exercise (optional: only for exercise)
 * @apiSuccess {String}     result.tags                     tags of the exercise (optional: only for exercise)
 */
router.get("/", (req, res, next) => {
    if(!req.query.text){
        res.sendStatus(400);
        return;
    }
    get_related_keywords(req.query.text)
    .then((related_keywords) => {
        if(req.query.type){
            if(req.query.type == "exercise"){
                search_exercise(req.db, req.query.text, related_keywords, req.query.lang_abbr, req.query.exercise_type, req.query.level)
                .then((exs) => res.send(exs));
            }else if(req.query.type == "user"){
                search_user(req.db, req.query.text, related_keywords)
                .then((users) => res.send(users));
            }else{
                res.sendStatus(400);
                return;
            }
        }else{
            // search all
            let results = [];
            search_exercise(req.db, req.query.text, related_keywords, req.query.lang_abbr, req.query.exercise_type, req.query.level)
            .then((exs) => results = results.concat(exs))
            .then(() => search_user(req.db, req.query.text, related_keywords))
            .then((users) => results = results.concat(users))
            .then(() => res.send(results));
        }
    });
});

module.exports = { router };