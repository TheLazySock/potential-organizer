var router = require('express').Router();
var cookieParser = require('cookie-parser');

router.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: '../front/public/'
    });
});

module.exports = router