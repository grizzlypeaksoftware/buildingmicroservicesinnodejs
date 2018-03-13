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