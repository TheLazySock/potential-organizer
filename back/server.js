var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(require('./api'));

var port = 3000;

app.listen(port, function() {
	console.log("Listening on " + port);
});
