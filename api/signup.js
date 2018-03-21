var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');
var checkUnauth = require('./middlewares/checkUnauth');

router.get('/signup', checkUnauth, function (req, res) {
    res.sendFile('signup.html', {
        root: './front/public/'
    });
});

router.post('/signup', checkUnauth, function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.sendStatus(400);
    }

    var username = req.body.username;
    req.body.email = req.body.username + ".default";
    console.log(req.body.email);
    var user = new User(req.body);
    return User.findOne({ 'username': username }, function (err, data) {
        if (data && data.username == username) {
            return res.send('User exist');
        } else {
            user.save(function (err) {
                if (!err) {
                    res.json(user)
                } else {
                    res.send('Oops Error:' + err);
                }
            });
        }
    });
});

module.exports = router