var DataAccess = require("./DataAccess.js");
const aws = require('aws-sdk');
aws.config.loadFromPath("./aws-config.json");

var Model = function(){};

Model.prototype.GetMessages = function(){
	return new Promise( function(fulfill, reject){	
		DataAccess.GetEntities("messaging_microservice", "messages")
		.then(function(docs){
			fulfill(docs);
		}).catch(function(err){
			reject(err);
		});
	});	
};

Model.prototype.InsertMessage = function(message){
	return new Promise( function(fulfill, reject){	

		DataAccess.InsertEntity(message, "messaging_microservice", "messages")
		.then(function(result){
			fulfill(result);
		}).catch(function(err){
			reject(err);
		});
	});	
};

Model.prototype.SendMessage = function(message, res){

	var that = this;

	 var params = {
        Message: message,
        MessageStructure: 'string',
		PhoneNumber: '+13037754807'
    };  

    var sns = new aws.SNS();
    var that = this;

    sns.publish(params, function(err, data) {
		var status = {};
        if (err){
			status.success = false;
			status.message = err.stack;
		} 
        else{
			status.success = true;
			/*
			that.InsertMessage(params).then(function(result){
				res.send(result);
			}).catch(function(error){
				res.send(error);
			});
			*/
		}   
    });    
};

module.exports = new Model();