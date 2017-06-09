//development.js
'use strict';

module.exports = {
	port: 3000,
	hostname: '127.0.0.1',
	baseUrl: 'http://localhost:3000',
	mongodb: {
		uri : 'mongodb://localhost/cm_dev_db'
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