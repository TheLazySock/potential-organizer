var express = require('express');
var app = express();
var http = ('http');
var path = ('path');
var bodyParser = require('body-parser');
// var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
app.use(require('./api'));

var port = 3000;

app.listen(port, function() {
	console.log("Listening on " + port);
});

app.use(express.static('../front/public/'));
app.use(cookieParser('admin'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Cookie, Origin");

  if ('OPTIONS' == req.method) {
	  res.sendStatus(200);
	  res.cookie('0', '1', {maxAge: 3600 * 1000 * 24 * 20});
  } else {
	  next();
	}
});

app.use(function(req, res, next) {
	res.cookie('1', '2', {maxAge: 3600 * 1000 * 24 * 20});
	res.send('norm');
	next();
});

// app.use(function(req,res,next){
// 	if((!req.cookies) || (!req.cookies.cookie)) {
// 	   next();
// 	   return;
// 	}
// 	User.findOne({'_id': req.cookies.cookie},function(err,user){
// 		if(!err) {
// 		  req.user = user;
// 		}
// 	   next();
// 	   res.json(user);
// 	});
//  });

// app.get('/', function(req,res){
// 	res.sendFile('../front/public/index.html');
// });