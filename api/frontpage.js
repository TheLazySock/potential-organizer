var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');

router.use(cookieParser());

router.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: './front/public/'
    });
});

module.exports = router