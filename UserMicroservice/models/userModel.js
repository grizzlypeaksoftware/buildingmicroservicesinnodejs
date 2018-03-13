var DataAccess = require("./DataAccess.js");

var Model = function(){};

Model.prototype.GetUsers = function(){
	return new Promise( function(fulfill, reject){	
		DataAccess.GetEntities("user_microservice", "users")
		.then(function(docs){
			fulfill(docs);
		}).catch(function(err){
			reject(err);
		});
	});
	
};



















Model.prototype.GetCSV = function(req,res){
	return {
		data : 
		[
			{
				_id: "id#", 
				name: "data point #1",
				value: 100.21
			}
		]
	}
};

module.exports = new Model();