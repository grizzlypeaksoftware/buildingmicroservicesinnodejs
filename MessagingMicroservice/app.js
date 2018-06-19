
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var config = require('config');
var microserviceConfig = config.get('microservice.config');

app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('static'));
app.use(bodyParser.json);

var model = require('./models/messagingModel');

app.get('/', function(req,res){
	res.render('index', { title: 'Messaging Microservice' });
});

app.get('/heartbeat', function(req, res){
	var status = {
		success: true,
		address: server.address().address,
		port: server.address().port
	 };
	res.send(status);
});

// Get JSON Reporting data by report name
app.get('/getMessages', function(req,res){	
	model.GetMessages().then(function(docs){
		res.send(docs);
	}).catch(function(err){
		res.send(err);
	});	
});

app.post('/send', function(req,res){
	console.log(message + "%");
	var message = req.body.message;	
	model.SendMessage(message, res);

});

app.get('/sendMessage', function(req,res){
	model.SendMessage("test sms message", res);
});


var server = app.listen(microserviceConfig.port, microserviceConfig.host, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Server Running On: http://%s:%s', host, port);
});