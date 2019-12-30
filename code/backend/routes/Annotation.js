const router = require("express").Router();

const env = process.env.NODE_ENV || 'development';
const domain = require(__dirname + '/../config/domain.json')[env].domain;

const annotation_include_config = (db, body_where={}, target_where={}) => { 
    return [
        {
            model: db.AnnotationResource,
            as: "body",
            where: body_where,
            attributes : {exclude: ["_id", "target_annotation_id", "body_annotation_id", "createdAt", "updatedAt"]},
            include: [
                {
                    model: db.AnnotationSelector,
                    as: "selector",
                    attributes : {exclude: ["resource_id", "createdAt", "updatedAt"]},
                }
            ]
        },
        {
            model: db.AnnotationResource,
            as: "target",
            where: target_where,
            attributes : {exclude: ["_id", "target_annotation_id", "body_annotation_id", "createdAt", "updatedAt"]},
            include: [
                {
                    model: db.AnnotationSelector,
                    as: "selector",
                    attributes : {exclude: ["resource_id", "createdAt", "updatedAt"]},
                }
            ]
        }
    ]
};

const serialize = (obj) => {
    const clean_null = (key, value) => {
        // Filtering out properties
        if (value === null || (Array.isArray(value) && value.length == 0)) {
          return undefined;
        }
        return value;
    };
    const clean_single_key_objs = (key, value) => {
        if (typeof(value) == "object" && Object.keys(value).length == 1){
            return clean_single_key_objs(null, value[Object.keys(value)[0]]);
        }
        return value;
    };
    const clean_ids = (key, value) => {
        if (key == "id" && !String(value).startsWith("http")){
            return undefined;
        }
        return value;
    }

    obj = JSON.parse(JSON.stringify(obj));
    obj = obj.map((a) => {
        a.id = domain + "annotation/" + a.id;
        return a;
    });
    obj = JSON.parse(JSON.stringify(obj, clean_ids));
    obj = JSON.parse(JSON.stringify(obj, clean_null));
    obj = JSON.parse(JSON.stringify(obj, clean_single_key_objs));

    return obj;
};

const deserialize_annotation_resource = (r) => {
    let result = [];
    if (typeof(r) == "string"){
        result.push({
            "id": r
        });
    }else if (Array.isArray(r)){
        result = r;
    }else if (typeof(r) == "object"){
        result.push(r);
    }
    return result;
};


router.get("/", (req, res, next) => {
    let annotation_where = {};
    let target_where = {};
    if(req.query.creator) {
        annotation_where.creator = req.query.creator;
    }
    if(req.query.target_creator){
        target_where.creator = req.query.target_creator;
    }
    if(req.query.target_source){
        target_where.source = req.query.target_source;
    }
    const db = req.db;
    db.Annotation.findAll({
        where: annotation_where,
        attributes: ['@context', 'id', 'type', 'creator', 'motivation', ['createdAt','created'], ['updatedAt','modified']],
        include: annotation_include_config(db, {}, target_where)
    })
    .then(annotations => {
        if(annotations.length === 0){
            res.send([]);
            return;
        }
        annotations = serialize(annotations);
        if(!Array.isArray(annotations)){
            annotations = [annotations];
        }
        res.send(annotations);
    });
});

router.post("/", (req, res, next) => {
    if (!req.session.user) {
        res.sendStatus(400);
        return;
    }
    
    let body = deserialize_annotation_resource(req.body.body);
    
    let target = deserialize_annotation_resource(req.body.target);

    const db = req.db;
    db.Annotation.create(
      {
        "@context": "http://www.w3.org/ns/anno.jsonld",
        type: "Annotation",
        creator: req.session.user.username,
        motivation: req.body.motivation,
        body: body,
        target: target
      },
      {
        include: annotation_include_config(db)
      }
      ).then(annotation => {
        res.send({id: domain + "annotation/" + annotation.id});
      });
});

router.get("/:id/", (req, res, next) => {
    if(!req.params.id){
        res.sendStatus(400);
        return;
    }
    const db = req.db;
    db.Annotation.findOne({
        where: { id: req.params.id },
        attributes: ['@context', 'id', 'type', 'creator', 'motivation', ['createdAt','created'], ['updatedAt','modified']],
        include: annotation_include_config(db)
    })
    .then(annotation => {
        if(!annotation){
            res.sendStatus(404);
            return;
        }
        res.send(serialize([annotation]));
    });
});

router.delete("/:id", (req, res, next) => {
    if(!req.params.id ){
        res.sendStatus(400);
        return;
    }
    if(!req.session.user){
        res.sendStatus(401);
        return;
    }
    const db = req.db;
    db.Annotation.findOne({
        where: { id: req.params.id },
        include: annotation_include_config(db)
    })
    .then((annotation) => {
        if(!annotation){
            res.sendStatus(404);
        }else if(annotation.creator != req.session.user.username){
            res.sendStatus(403);
        }else{
            annotation.destroy()
            .then(() => {
                res.sendStatus(204);
            })
            .catch(() => {
                res.sendStatus(500);
            });
        }
        
    });
});

module.exports = { router };