//test.js
'use strict';

module.exports = {
	port: 3000,
	hostname: '127.0.0.1',
	baseUrl: 'http://127.0.0.1:3000',
	mongodb: {
		uri : 'mongodb://127.0.0.1/cm_dev_db'
	},
	app: {
		name : 'Contact manager'
	},
	serveStatic : true,
	session : {
		type: 'mongo',
		secret: 'u+J%E^9!hx?piXLCfiMY.EDc',
		resave: false,
		saveUninitialized: true
	}
};