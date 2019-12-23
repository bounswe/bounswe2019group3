
const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const session = require('express-session');
const path = require("path");

const Auth = require('./Auth'); 
const User = require('./User');
const Language = require('./Language');
const Chat = require('./Chat');
const Search = require('./Search');
const Writing = require('./Writing');
const Annotation = require('./Annotation');

const db = require('../models/index');

const delay = (t, v) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
};

console.log("Waiting 30s for DB to get up!")
delay(30000)
.then(()=> console.log("SYNC DB"))
.then(() => db.sequelize.sync({
    force: true
})).then(() => {
    console.log("Seeding DB")
    const seed_dir = path.join(__dirname, "/../seeders");
    require("fs").readdirSync(seed_dir).forEach((seed_name) => {
        const seeder = require(path.join(seed_dir, seed_name));
        seeder.down(db.sequelize.getQueryInterface(), db.Sequelize)
        .then(() => seeder.up(db.sequelize.getQueryInterface(), db.Sequelize))
        .then(() => console.log("Seeding successful: "+ seed_name))
        .catch((err) => console.log("Seeding failed: "+ seed_name + err));
    });
});

// inject db to req
router.use((req,res,next) => {
    req.db = db;
    next();
});

// for parsing application/json
router.use(body_parser.json()); 
// for parsing application/x-www-form-urlencoded
router.use(body_parser.urlencoded({ extended: true })); 

// for parsing cookies
router.use(cookie_parser()); 

router.use(session({secret: "Session Secret - BounSWE2019Group3"}));

// Serve /backend/uploads 
router.use("/uploads", express.static('/backend/uploads'));

router.use("/docs", express.static('api-docs'));

router.use("/auth", Auth.router);

router.use("/user", User.router);

router.use('/language', Language.router);

router.use('/chat', Chat.router);

router.use('/search', Search.router);

router.use('/writing', Writing.router);

router.use('/annotation', Annotation.router);

// return the router
module.exports = {router};
