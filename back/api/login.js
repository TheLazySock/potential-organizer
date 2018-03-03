var router = require('express').Router();
var cookieParser = require('cookie-parser');
var config = require('../config');
var User = require('./models/user');

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
                var exprs = 3600 * 24 * 1000 * 3;
                res.cookie('loggedIn', 'yes', {maxAge: exprs, httpOnly: true});
                res.json(data);
            }
        })
    }
});

// router.get('/login', function(req, res, next) {
//     if ((!req.cookies) || (!req.cookies.loggedIn)) {
//         next();
//         return;
//     }
//     User.findOne({'_id': req.cookies.loggedIn},function(err,user){
//         if(!err) {
//             req.user = user;
//         }
//         var exprs = 3600 * 24 * 1000 * 3;
//         res.cookie('usersession', user.id, {maxAge: exprs});
//         next();
//     });
// })

module.exports = router