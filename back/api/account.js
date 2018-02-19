var router = require('express').Router()
var jwt = require('jwt-simple')
var config = require('../config')
var User = require('./models/user')

router.get('/account', function(req, res, next){
    if (!req.headers['x-auth']) { return res.sendStatus(401)}
    try {
        var username = jwt.decode(req.headers['x-auth'], config.secretkey).username
    } catch(err) {
        return res.sendStatus(401)
    }
    User.findOne({username: username}, function(err, user){
        if (err) { 
            return res.sendStatus(500)
        } 
        if (!user) { return res.sendStatus(401)} 
        res.json(user)
    })
})

module.exports = router