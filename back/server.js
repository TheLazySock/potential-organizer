var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./model/user');
var User = mongoose.model('user');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;


mongoose.connect('mongodb://admin:admin@ds235388.mlab.com:35388/potential-organizer');
var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error'));
db.once('open',function() {
	console.log('Connected');
});

app.use(express.static('../front/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Cookie, Origin");

  if ('OPTIONS' == req.method) {
		res.sendStatus(200);
  } else {
		next();
	}
});

app.get('/', function(req,res){
	res.sendFile('../front/index.html');
});

app.post('/user', function(req, res){
  var user = new User(req.body);
  console.log(req.body);

  user.save(function(err){
		if(err)
			res.send("Oops, Error" + err)
		else
			res.send(JSON.stringify(req.body));
  });
});


app.listen(port, function() {
  console.log("Listening on " + port);
});
