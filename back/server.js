var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('./api'));

var port = 3000;

app.listen(port, function() {
	console.log("Listening on " + port);
});

app.use(express.static('../front/public/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
// 	res.header("Access-Control-Allow-Credentials", true);
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Cookie, Origin");

//   if ('OPTIONS' == req.method) {
// 	  res.sendStatus(200);
//   } else {
// 	  next();
// 	}
// });

// app.use(function(req, res, next) {
// 	if((!req.cookies) || (!req.cookies.cookie)) {
// 		next();
// 		return;
// 	}
// 	try {
// 		var auth = jwt.decode(req.headers['x-auth'], config.secretkey)
//     } catch (err) {
//         return res.sendStatus(401)
//     }
//     User.findOne({username: auth.username}, function(err, user) {
//         if (err) {return res.sendStatus(500)}
//         else {
//             res.json(user)
//         }
//     });
// });

app.get('/', function(req,res){
	res.sendFile('../front/public/index.html');
});