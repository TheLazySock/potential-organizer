var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');

router.use(cookieParser());

router.get('/account', function(req, res) {
    res.sendFile('account.html', {
        root: '../front/public/'
    });
});

module.exports = router