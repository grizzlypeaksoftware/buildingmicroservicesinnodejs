
var express = require('express');
var app = express();
var path = require('path');
var config = require('config');
var microserviceConfig = config.get('microservice.config');

app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('static'));

// Instantiate the Reporting Model
var model = require('./models/reportingModel');

app.get('/', function(req,res){
	res.render('index', { title: 'Reporting Microservice' });
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
app.get('/getreport', function(req,res){
	var report = req.query.report;
	var query = req.query.q;

	if(!report){
		report = "sales";
	}	
	model.GetReport(report, query).then(function(docs){
		res.send(docs);
	}).catch(function(err){
		res.send(err);
	});	
});

var server = app.listen(microserviceConfig.port, microserviceConfig.host, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Server Running On: http://%s:%s', host, port);
});