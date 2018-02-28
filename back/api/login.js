var router = require('express').Router();
var jwt = require('jwt-simple');
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
                res.cookie('cookie', data.id, {maxAge: exprs, httpOnly: true});
                res.json(data);
            }
        })
    }
});

module.exports = router

/* 
var bcrypt = require('bcrypt');
router.post ('/login', function(req, res, next){
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400) 
    } else {
        var email = req.body.email
        var password = req.body.password
        
        User.findOne({email: email})
        .select('password')
        .exec(function(err, user){
            if (err) {
                return res.sendStatus(500)
            } 
            if (!user) {return res.sendStatus(401)}
            bcrypt.compare(password, user.password, function(err, valid){
                if (err) {
                    return res.sendStatus(500)
                }
                if (!valid){ return res.sendStatus(401)}
                var token = jwt.encode({email: email}, config.secretkey);
                var exprs = 3600 * 24 * 1000 * 3;
                res.cookie('cookie', token, {maxAge: exprs, httpOnly: true});
                // console.log('succesfylly logged in');
                // res.json(user);
                // res.send(token)
            })
        })
    }
})
 */