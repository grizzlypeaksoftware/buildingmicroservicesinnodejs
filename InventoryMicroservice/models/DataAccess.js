var DataAccess = function () {
	this.MongoClient = require('mongodb').MongoClient
		, assert = require('assert');
	this.Mongo = require('mongodb');
	this.DBConnectionString = 'mongodb://127.0.0.1:27017';	
};

DataAccess.prototype.GetEntities = function(dbName, collectonName, query){
	
	var that = this; 

	if(query){
		try{
			query = JSON.parse(query);	
		} catch(exception){
			console.log(exception);
		}
		
	} else {
		query = {};
	}

	return new Promise( function(fulfill, reject){	
		that.MongoClient.connect(that.DBConnectionString)
		.then(function(db){
			var database = db.db(dbName);
			var collection = database.collection(collectonName);

			collection.find(query).toArray(function (err, docs) {	
				db.close();
				if(err){
					reject(err);
				} else {
					fulfill(docs);
				}
			});
		}).catch(function(err){
			reject(err);
		});
	});	
};

module.exports = new DataAccess();