var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');
var checkAuth = require('./middlewares/checkAuth');

router.use(cookieParser());

router.get('/accountinfo', checkAuth, function (req, res) {
    var user_id = req.user_id;
    return User.findOne({ '_id': user_id }, { _id: 0, __v: 0, user_id: 0 }, function (err, data) {
        if (err) {
            res.send('Oops, there is error:' + err);
        } else {
            res.json(data);
            // res.send('OK');
        }
    });
});

router.put('/accountinfo', checkAuth, function (req, res) {
    if (req.body) {
        var user_id = req.user_id;
        console.log(user_id);
        console.log(req.body);
        console.log(req.body.name);
        return User.update({ '_id': user_id }, {
            $set: {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                sex: req.body.sex,
                birthday: req.body.birthday,
                phone: req.body.phone,
                facebook: req.body.facebook,
                vk: req.body.vk,
                twitter: req.body.twitter
            }
        }, function (err) {
            if (err) {
                res.send('Oops, there is error:' + err);
            } else {
                res.send('OK');
            }
        });
        console.log(req.body);
    }
});

router.get('/account', checkAuth, function (req, res) {
    var user_id = req.user_id;
    console.log(user_id);
    res.sendFile('account.html', {
        root: './front/public/'
    });
});

module.exports = router