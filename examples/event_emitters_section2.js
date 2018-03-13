const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', (err, res) => {
	if (err) {
		console.log(err);
	} else {
		console.log(JSON.parse(res)); 
	}
});


fs.readFile(filename, 'utf8', function (err, res){
	myEmitter.emit('event', err, res);
});


