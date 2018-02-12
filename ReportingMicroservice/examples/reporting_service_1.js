


// Instantiate the Reporting Model
var model = require('../models/reportingModel');

// Get JSON Reporting data by report name
app.get('/getreport', function(req,res){
	model.GetReport(req,res);
});

// Get CSV Reporting data by report name
app.get('/getcsv', function(req,res){
	model.GetCSV(req,res);
});