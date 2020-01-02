const router = require("express").Router();

const env = 'production';
const domain = require('./../config/domain.json')[env].domain;

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

/**
 * @api {get} /api/annotation lists the annotations filtered by creator, target_creator, target_source
 * @apiDescription This endpoint returns a list of annotations in the W3C Web Annotation Data Model format (https://www.w3.org/TR/annotation-model/) filtered by creator, target_creator, target_source
 * @apiName list annotation
 * @apiGroup annotation
 * @apiPermission User
 * @apiParam (Request Query) {String} creator
 * @apiParam (Request Query) {String} target_creator
 * @apiParam (Request Query) {String} target_source
 * @apiSuccess (body(JSON)) {Object[]}  annotation (see W3C Web Annotation Data Model for details)
 * @apiSuccess (body(JSON)) {String} annotation.type             
 * @apiSuccess (body(JSON)) {Object} annotation.body
 * @apiSuccess (body(JSON)) {Object} annotation.target 
 * @apiSuccess (body(JSON)) {Object} annotation.creator 
 * @apiSuccess (body(JSON)) {Object} annotation.motivation 
 */
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


/**
 * @api {post} /api/annotation create new annotation 
 * @apiDescription This endpoint takes an annotation in the W3C Web Annotation Data Model format (https://www.w3.org/TR/annotation-model/) and saves it to the database
 * @apiName create annotation
 * @apiGroup annotation
 * @apiPermission User
 * @apiParam (Request body(JSON)) {Object}  annotation (see W3C Web Annotation Data Model for details)
 * @apiParam (Request body(JSON)) {String} annotation.type             
 * @apiParam (Request body(JSON)) {Object} annotation.body 
 * @apiParam (Request body(JSON)) {Object} annotation.target 
 * @apiParam (Request body(JSON)) {Object} annotation.motivation
 * @apiSuccess {String}   id
 */
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


/**
 * @api {get} /api/annotation/:id returns the annotation specified by the id
 * @apiDescription This endpoint returns the annotation specified by the id in the W3C Web Annotation Data Model format (https://www.w3.org/TR/annotation-model/)
 * @apiName get annotation
 * @apiGroup annotation
 * @apiPermission User
 * @apiParam (Request Param) {String} id
 * @apiSuccess (body(JSON)) {Object}  annotation (see W3C Web Annotation Data Model for details)
 * @apiSuccess (body(JSON)) {String} annotation.type             
 * @apiSuccess (body(JSON)) {Object} annotation.body
 * @apiSuccess (body(JSON)) {Object} annotation.target 
 * @apiSuccess (body(JSON)) {Object} annotation.creator 
 * @apiSuccess (body(JSON)) {Object} annotation.motivation 
 */
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

/**
 * @api {delete} /api/annotation/:id deletes the annotation specified by the id
 * @apiDescription This endpoint deletes the annotation specified by the id
 * @apiName delete annotation
 * @apiGroup annotation
 * @apiPermission User
 * @apiParam (Request Param) {String} id
 */
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