
var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send({name : "extremely basic microservice example"});
});

var server = app.listen(80, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Server Running On: http://%s:%s', host, port);
});