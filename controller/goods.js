var express = require('express');
var router = express.Router();
var goods = require('../db/goods');

router.post('/', function (req, res) {
    goods.postGoods(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/', function (req, res) {
    goods.getGoods(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/:category', function (req, res) {
    services.getGoodsByCategory(req, (result) => {
        res.status(200)
            .json(result);
    });
});

module.exports.router = router;