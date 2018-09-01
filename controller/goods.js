var express = require('express');
var router = express.Router();
var goods = require('../db/goods');

router.post('/', function (req, res) {
    goods.postGoods(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/:excludeUser', function (req, res) {
    goods.getGoods(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/top_posted/:location', function (req, res) {
    goods.getTopPostedByKampong(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/top_posted', function (req, res) {
    goods.getTopPosted(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/top_posted/giveaway/:location', function (req, res) {
    goods.getTopCategoryPosted(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/top_posted/requested/:location', function (req, res) {
    goods.getTopCategoryRequested(req, (result) => {
        res.status(200)
            .json(result);
    });
});


router.get('/:category', function (req, res) {
    goods.getGoodsByCategory(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.put('/:id', function (req, res) {
    goods.updateStatus(req, (result) => {
        res.status(200)
            .json(result);
    });
});

module.exports.router = router;