var router = require('express').Router();
var cookieParser = require('cookie-parser');
var User = require('./models/user');
var checkAuth = require('./middlewares/checkAuth');

router.get('/logout', checkAuth, function (req, res) {
  res.sendFile('logout.html', {
    root: './front/public/'
  });
});

router.post('/logout', checkAuth, function (req, res, next) {
  res.clearCookie('loggedIn');
  res.clearCookie('sid');
  res.status(200);
  res.send('cookie has been deleted succesfully');
});

module.exports = router