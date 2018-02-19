var router = require('express').Router()
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple')
var config = require('../config')
var User = require('./models/user')

router.post ('/login', function(req, res, next){
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(400) 
    } else {
        var username = req.body.username
        var password = req.body.password
        User.findOne({username: username})
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
                var token = jwt.encode({username: username}, config.secretkey)
                res.send(token)
            })
        })
    } 
})

module.exports = router