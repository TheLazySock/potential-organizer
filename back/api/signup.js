var router = require('express').Router();
var jwt = require('jwt-simple');
var cookieParser = require('cookie-parser');
var User = require('./models/user');
var config = require('../config');

router.post('/signup', function(req, res, next) {
    var email = req.body.email;
    var user = new User(req.body);
    return User.findOne({'email': email}, function(err, data){
        if(data && data.email == email){
            return res.send('User exist');
        } else {
            user.save(function(err){
                if(!err){
                    return res.json(user)
                }else{
                    res.send('Oops Error:' + err);
                }
            });
        }
    });    
});
module.exports = router
/* 
var bcrypt = require('bcrypt');
router.post('/user', function (req, res, next){
    var user = new User
    user.username = req.body.username
    user.name = req.body.name
    user.surname = req.body.surname
    user.email = req.body.email
    var password = req.body.password
    bcrypt.hash(password, 10, function(err, hash){
        if (err){res.sendStatus(500)}
        else {
            user.password = hash
            user.save(function (err) {
                if (err) { res.sendStatus(500)}
                else {
                    res.sendStatus(201)
                }
            });
        }
    });
})
router.get('/user', function (req, res, next) {
    if(!req.headers['x-auth']) {
        return res.sendStatus(401)
    }
    try {
        var auth = jwt.decode(req.headers['x-auth'], config.secretkey)
    } catch (err) {
        return res.sendStatus(401)
    }
    User.findOne({username: auth.username}, function(err, user) {
        if (err) {return res.sendStatus(500)}
        else {
            res.json(user)
        }
    })
})
 */