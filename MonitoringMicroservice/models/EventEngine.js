const events = require('events');
var http=require("http");

var config = require('config');
var microserviceConfig = config.get('microservice.config');

var EventEngine = function(){
    this.event_emitter = new events.EventEmitter();
    this.EventLoopInterval = 10000; // number of milliseconds 
};

EventEngine.prototype.Start = function () {
	var that = this;
    console.log("Starting Event Engine");
    console.log("---------------------------------------");
    console.log("Monitoring the following microservices");
    console.log("---------------------------------------");
    console.log(microserviceConfig.services);
    console.log("---------------------------------------");
	setInterval(function () {
		try{        
			var promises = that.GetStatus(microserviceConfig.services);

			Promise.all(promises).then(function(values){
				for(var i = 0; i < values.length; i++){
					var value = values[i];
					
					if(value.address && value.port){
                        console.log("---------------------------------------");
                        console.log("Address and Port Result");
                        console.log(value.address  + ":" + value.port);
                        message = "Service is up!";                        
                        if(!value.success){
                            message = "Service is DOWN!!!";
                            var service;
                            for(var j = 0; j < microserviceConfig.services.length; j++){
                                if(microserviceConfig.services[j].address == value.address && microserviceConfig.services[j].port == value.port){
                                    service = microserviceConfig.services[j];
                                }
                            }

                            
                            if(service.triggered){
                                console.log("Text has already been delivered.");
                            } else {
                                that.SendAlert(service).then(function(data){                            
                                    console.log(data);
                                }).catch(function(err){                                
                                    console.log(err);
                                });
                            }

                            service.triggered = true;
                            
                        }
                        console.log(message);                        
                        console.log("---------------------------------------");
						
					}
				}				
			}).catch(function(err){
                console.log(err);              
						
			});		

		} catch(e){
			console.log("failed interval");
			console.log(e);
		}
        
	}, this.EventLoopInterval);
};

EventEngine.prototype.GetStatus = function(services){
    var promises = [];
    for(var i = 0; i < services.length; i++){
        var url = "http://" + services[i].address + ":" + services[i].port + "/heartbeat";
        promises.push(this.GetMicroserviceData(url, services[i]));
    }
    return promises;
};

EventEngine.prototype.GetMicroserviceData = function(url, service){

    var that = this;
    
	return new Promise(function(fulfill, reject){
        var request = http.get(url, res => {
            if (res.statusCode < 200 || 
                res.statusCode > 299) {
                    var er = new Error('Error status code: '+ res.statusCode);                   
                    reject(er);
            }
            var body = "";
            res.setEncoding("utf8");
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                try{
                    fulfill(body);
                } catch(exception){
                    reject(exception);
                }
            
                if(body && body.success){ 
                    fulfill(body.result);
                }
            });
        });

        request.on("error", function(err){              
            err.success = false;        
           
            fulfill(err);
        });
    });
};

EventEngine.prototype.SendAlert = function(service){
    console.log('Sending SMS alert')
    return new Promise(function(fulfill, reject){

        var post_data = {
            message: service.name + " - " + service.address + ":" + service.port + " is down."   
        }

        var post_options = {
            hostname: microserviceConfig.alerting.address,
            port: microserviceConfig.alerting.port,
            path: microserviceConfig.alerting.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        var request = http.request(post_options, function(res){

            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            
            var body = [];
            res.on("data", function(chunk){
                body.push(chunk);            
            });
            
            res.on("end", () => {             
                try{                    
                    body = JSON.parse(body.join('').toString());
                } catch(e){
                    reject(e);
                }
                
                fulfill(body);
            });
        });
        
        request.on("error", function(err){                              
            reject(err);
        });
        
        request.write(JSON.stringify(post_data));
        request.end();
    });
};

module.exports = new EventEngine();