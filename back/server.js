var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var config = require('./config');
var session = require('express-session');
var sessionstore = require('sessionstore');
var port = 3000;

var app = express();

app.use(require('./api'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../front/public/static'));

// var sess = {
// 	secret: config.get('session:secret'),
// 	key: config.get('session:key'),
// 	cookie: config.get('session:cookie'),
// 	resave: true,
// 	saveUninitialized: false
// }

// sess.cookie.maxAge = 3600 * 1000 * 24 * 3;

// app.use(session(sess));

// app.use(require('./api/customMiddleware/checkAuth'));
// app.use(require('./api/customMiddleware/userSession'));

app.use(session({
	secret: config.get('session:secret'),
	key: config.get('session:key'),
	cookie: config.get('session:cookie'),
	resave: true,
	saveUninitialized: false,
	store: sessionstore.createSessionStore({
		type: 'mongodb',
		collectionName: 'sessions',
        url: 'mongodb://admin:admin@ds235388.mlab.com:35388/potential-organizer'
    }),
}));

app.use(function(req, res, next) {
	req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
	res.send('Visits: ' + req.session.numberOfVisits);
});

app.listen(port, function() {
	console.log("Listening on " + port);
});
