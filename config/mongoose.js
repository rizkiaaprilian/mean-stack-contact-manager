//mongoose.js

'use strict';

const mongoose = require('mongoose');
const config = require('./index');

module.exports.init = initMongoose;

function initMongoose(app){
	mongoose.connect(config.mongodb.uri);
	//if the node process ends, cleanup existing connection
	process.on('SIGINT', cleanup);
	process.on('SIGTERM', cleanup);
	process.on('SIGHUP', cleanup);

	if (app) {
		app.set('mongoose', mongoose);
	}
	return mongoose;
}

function cleanup(){
	mongoose.connection.close(function(){
		console.log('Closing DB Connections and stopping the app.');
		process.exit(0);
	});
}