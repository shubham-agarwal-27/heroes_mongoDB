const mongoose = require('mongoose');

let uri = 'mongodb://localhost/the_supers_prod';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true});

mongoose.connection.on('connected', () => {
	console.log("==========================");
	console.log("==========================");
	console.log("Mongoose connected on " +  uri);
	console.log("==========================");
	console.log("==========================");
});

mongoose.connection.on('error', err => {
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
	console.log("MONGOOSE DISCONNECTED");
});


const shutdown = (msg, callback) => {
	mongoose.connection.close(() => {
		console.log("Mongoose disconneced through " + msg);
		callback();
	});
};



process.once('SIGUSR2', () => {
	shutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});


process.on('SIGINT', () => {
	shutdown('app termination', () => {
		process.exit(0);
	});
});

process.on('SIGTERM', () => {
	shutdown('Heroku app shutdown', () => {
		process.exit(0);
	});
});





require('./heroes.js');