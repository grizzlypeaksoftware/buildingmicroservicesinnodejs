var DataAccess = require("./DataAccess.js");

var Model = function(){};

Model.prototype.GetReport = function(reportName, query){
	return new Promise( function(fulfill, reject){	
		DataAccess.GetEntities("reporting_microservice", reportName, query)
		.then(function(docs){
			fulfill(docs);
		}).catch(function(err){
			reject(err);
		});
	});	
};

module.exports = new Model();