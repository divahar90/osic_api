var express = require('express');
var router = express.Router();

router.use('/api/goods', require('../controller/goods').router);
router.use('/api/users', require('../controller/users').router);

// application -------------------------------------------------------------
router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;