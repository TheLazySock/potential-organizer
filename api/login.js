var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');

router.use(cookieParser());

router.get('/login', function(req, res) {
    res.sendFile('login.html', {
        root: './front/public/'
    });
});

router.post('/login', function(req, res, next) {
    
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(400);
    } 
    if (req.cookies.sid) {
        res.redirect('/');
    } else {
        var username = req.body.username;
        var password = req.body.password;

        return User.findOne({'username': username, 'password': password}, {password: 0}, function(err, data) {
            if (err) {
                return err;
                res.send('Error, try again');
            } 
            if (data) {
                var exprs = 3600 * 24 * 1000 * 3;
                res.cookie('sid', data.id, {maxAge: exprs, httpOnly: true});
                res.cookie('loggedIn', 'auth', {maxAge: exprs, httpOnly: false});
                res.json(data);
            } else {
                res.status(500).send('Error with authorization, username and/or password are incorrect');
            }
        })
    }
});

module.exports = router