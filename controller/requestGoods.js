var express = require('express');
var router = express.Router();
var requestGoods = require('../db/requestgoods');

router.post('/', function (req, res) {
    requestGoods.requestGoods(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/', function (req, res) {
    requestGoods.getRequestedGoods(req, (result) => {
        res.status(200)
            .json(result);
    });
});

router.get('/:category', function (req, res) {
    requestGoods.getRequestedGoodsByCategory(req, (result) => {
        res.status(200)
            .json(result);
    });
});

module.exports.router = router;