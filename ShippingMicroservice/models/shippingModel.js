var DataAccess = require("./DataAccess.js");

var Model = function(){};

Model.prototype.GetOrders = function(){

	var query = {};
	
	return new Promise( function(fulfill, reject){
		DataAccess.GetEntities("shipping_microservice", "orders", query)
		.then(function(docs){
			fulfill(docs);
		}).catch(function(err){
			reject(err);
		});
	});
};

module.exports = new Model();