var DataAccess = require("./DataAccess.js");

var Model = function(){};

Model.prototype.GetInventory = function(category){

	var query = {};
	if(category){
		query.category = category;
	}

	return new Promise( function(fulfill, reject){	
		DataAccess.GetEntities("inventory_microservice", "inventory", query)
		.then(function(docs){
			fulfill(docs);
		}).catch(function(err){
			reject(err);
		});
	});
	
};

module.exports = new Model();



















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