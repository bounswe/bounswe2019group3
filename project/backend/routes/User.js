
const router = require('express').Router()

router.get("/", (req, res, next) => {
    res.sendStatus(501);
});

router.get("/:username/", (req, res, next) => {
    res.sendStatus(501);
});

router.post("/:username/", (req, res, next) => {
    res.sendStatus(501);
});

module.exports = {router};