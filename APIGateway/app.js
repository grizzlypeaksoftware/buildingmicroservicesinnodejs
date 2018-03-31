
var express = require('express');
var app = express();
var path = require('path');

var config = require('config');
var microserviceConfig = config.get('microservice.config');

app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('static'));

// Instantiate the Inventory Model
var model = require('./models/gatewayModel');

app.get('/', function(req,res){
	res.render('index', { title: 'API Gateway Example' });
});

app.get('/api_tester', function(req,res){
	res.render('api_tester', { title: 'API Gateway Tester' });
});

// Get JSON Reporting data by report name
app.get('/getStatus', function(req,res){

	var promises = model.GetStatus(microserviceConfig.services);

	Promise.all(promises).then(function(values){
		for(var i = 0; i < values.length; i++){
			var value = values[i];
			
			if(value.address && value.port){
				for(var j = 0; j < microserviceConfig.services.length; j++){

					if(microserviceConfig.services[j].address == value.address &&
						microserviceConfig.services[j].port == value.port)
						{
							value.config = microserviceConfig.services[j];
						}
				}
			}
		}
		res.send(values);
	}).catch(function(err){
		res.send(err);		
	});		
});

var server = app.listen(microserviceConfig.port, microserviceConfig.host, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Server Running On: http://%s:%s', host, port);
});