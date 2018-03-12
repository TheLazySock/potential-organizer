var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');

router.use(cookieParser());

router.get('/accountinfo', function(req, res) {
    if (!req.cookies.sid) {
        res.redirect('/');
    } else {
        var user_id = req.cookies.sid;
        return User.findOne({'_id': user_id}, {_id: 0, __v: 0, user_id: 0}, function(err, data) {
            if (err) {
                res.send('Oops, there is error:' + err);
            } else {
                res.json(data);
                // res.send('OK');
            }
        });
    }
});

router.get('/account', function(req, res) {
    if (!req.cookies.sid) {
        res.redirect('/');
    } else {
        res.sendFile('account.html', {
            root: '../front/public/'
        });
    }
});

module.exports = router