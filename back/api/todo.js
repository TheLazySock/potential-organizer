var router = require('express').Router();
var cookieParser = require('cookie-parser');
var config = require('../config');
var User = require('./models/user');

router.get('/todo', function(req, res) {
    res.sendFile('todo.html', {
        root: '../front/public/'
    });
});

module.exports = router