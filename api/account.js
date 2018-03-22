var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');
var checkAuth = require('./middlewares/checkAuth');

router.use(cookieParser());

function isError(res, err, data) {
    if (err) {
        return res.send('Oops, there is error:' + err);
    } else {
        if (data) {
            return res.json(data);
        }
        return res.send('OK');
    }
}

router.get('/accountinfo', checkAuth, function (req, res) {
    var user_id = req.user_id;
    return User.findOne({ '_id': user_id }, { _id: 0, __v: 0, user_id: 0 }, function (err, data) {
        isError(res, err, data)
    });
});

router.put('/accountinfo', checkAuth, function (req, res) {
    if (!req.body) return;
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
        isError(res, err)
    });
    console.log(req.body);
});

router.get('/account', checkAuth, function (req, res) {
    var user_id = req.user_id;
    console.log(user_id);
    res.sendFile('account.html', {
        root: './front/public/'
    });
});

module.exports = router