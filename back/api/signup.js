var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');

router.get('/signup', function(req, res) {
    res.sendFile('signup.html', {
        root: '../front/public/'
    });
});

router.post('/signup', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400);
    } else {
        var email = req.body.email;
        var user = new User(req.body);
        return User.findOne({'email': email}, function(err, data) {
            if (data && data.email == email) {
                return res.send('User exist');
            } else {
                user.save(function(err) {
                    if (!err) {
                        var exprs = 3600 * 24 * 1000 * 3;
                        // res.cookie('sid', data.id, {maxAge: exprs, httpOnly: true});
                        res.json(user)
                    } else {
                        res.send('Oops Error:' + err);
                    }
                });
            }
        }); 
    }
});  

module.exports = router