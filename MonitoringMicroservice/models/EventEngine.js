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
	console.log(microserviceConfig.services);
	setInterval(function () {
		try{        
			var promises = that.GetStatus(microserviceConfig.services);

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

				console.log(values);
				//res.send(values);
			}).catch(function(err){
                console.log(err);

               ;

                that.SendAlert(er, service).then(function(data){
                    console.log(data);
                });
						
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
        var url = services[i].url + ":" + services[i].port + "/heartbeat";
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
                    that.SendAlert(er, service).then(function(data){
                    console.log(data);
                    });
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
            that.SendAlert(er, service).then(function(data){
                console.log(data);
                });
            fulfill(err);
        });
    });
};

EventEngine.prototype.SendAlert = function(er, service){
    console.log('Sending SMS alert')
    return new Promise(function(fulfill, reject){

        var post_data = {
            message: service.name + " - " + service.address + ":" + service.port + " is down."   
        }

        var post_options = {
            host: microserviceConfig.alerting.address,
            port: microserviceConfig.alerting.port,
            path: microserviceConfig.alerting.path,
            method: 'POST',
            headers: {
                'Content-Type': 'text/json',
                'Content-Length': Buffer.byteLength(post_data)
            }
        };

        var request = http.request(url, res => {
          
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

module.exports = new EventEngine();