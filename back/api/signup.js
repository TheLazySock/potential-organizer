var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');

router.get('/signup', function(req, res) {
    res.sendFile('signup.html', {
        root: '../front/public/'
    });
});

router.post('/signup', function(req, res, next) {
    var email = req.body.email;
    var user = new User(req.body);
    return User.findOne({'email': email}, function(err, data) {
        if (data && data.email == email) {
            return res.send('User exist');
        } else {
            user.save(function(err) {
                if (!err) {
                    return res.json(user)
                } else {
                    res.send('Oops Error:' + err);
                }
            });
        }
    }); 
});  

module.exports = router