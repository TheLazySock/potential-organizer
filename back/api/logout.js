var router = require('express').Router();
var cookieParser = require('cookie-parser');
var config = require('../config');
var User = require('./models/user');
var checkAuth = require('./customMiddleware/checkAuth');

router.post = function(req, res, next) {
    var sid = req.session.id;
  
    req.session.destroy(function(err) {
      if (err) return next(err);
  
      res.redirect('/');
    });
};

module.exports = router