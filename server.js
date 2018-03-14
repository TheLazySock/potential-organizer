var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var port = 3000;

var app = express();

app.use(require('./api'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./front/public/static'));



app.listen(port, function() {
	console.log("Listening on " + port);
});
