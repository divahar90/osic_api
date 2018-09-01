var express = require('express');
var router = express.Router();
var users = require('../db/users');

router.get('/:userName', function (req, res) {
    users.getUser(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/', function (req, res) {
    users.getTopUsers(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.put('/:userName', function (req, res) {
    users.updateReviewsAndRatings(req, (result) => {
        res.status(200)
            .json(result);
    });
});

module.exports.router = router;