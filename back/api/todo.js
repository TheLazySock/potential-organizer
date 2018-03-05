var router = require('express').Router();
var cookieParser = require('cookie-parser');
var config = require('../config');
var User = require('./models/user');
var checkAuth = require('./customMiddleware/checkAuth');

router.get('/todo', function(req, res) {
    // if (!checkAuth) {
    //     res.redirect('/');
    // } else { 
    //     res.sendFile('todo.html', {
    //         root: '../front/public/'
    //     });
    // }
    res.sendFile('todo.html', {
        root: '../front/public/'
    });
});

module.exports = router