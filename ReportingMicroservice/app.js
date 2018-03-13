
var express = require('express');
var app = express();
var path = require('path');

app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('static'));

// Instantiate the Reporting Model
var model = require('./models/reportingModel');



app.get('/', function(req,res){
	res.render('index', { title: 'Reporting Microservice' });
});


// Get JSON Reporting data by report name
app.get('/getreport', function(req,res){	
	model.GetReport().then(function(docs){
		res.send(docs);
	}).catch(function(err){
		res.send(err);
	});	
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