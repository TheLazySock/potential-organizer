var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');

router.get('/login', function(req, res) {
    res.sendFile('login.html', {
        root: '../front/public/'
    });
});

router.post('/login', function(req, res, next) {
    
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400);
    } else {
        var email = req.body.email;
        var password = req.body.password;

        return User.findOne({'email': email, 'password': password}, {password: 0}, function(err, data) {
            if (err) {
                res.send('Error, try again')
            } else {
                // var exprs = 3600 * 24 * 1000 * 3;
                // res.cookie('loggedIn', 'yes', {maxAge: exprs, httpOnly: false});
                res.json(data);
            }
        })
    }
});

module.exports = router