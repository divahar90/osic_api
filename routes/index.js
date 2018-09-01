var express = require('express');
var router = express.Router();

router.use('/api/goods', require('../service/goods').router);
router.use('/api/services', require('../service/services').router);


// application -------------------------------------------------------------
router.get('/', function (req, res) {
    res.render('index', { title: 'API' });
});

module.exports = router;