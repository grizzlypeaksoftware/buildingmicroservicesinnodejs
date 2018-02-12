
var express = require('express');
var app = express();

// Instantiate the Reporting Model
var model = require('./models/reportingModel');


// Get JSON Reporting data by report name
app.get('/getreport', function(req,res){	
	res.send(model.GetReport(req,res));
});

// Get CSV reporting data by report name
app.get('/getcsv', function(req,res){	
	res.send(model.GetCSV(req,res));
});

var server = app.listen(80, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Server Running On: http://%s:%s', host, port);
});