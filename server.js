//server.js
'use strict';

//get environment or set default environment to dev
const ENV = process.env.NODE_ENV || 'development';
const DEFAULT_PORT = 3000;
const DEFAULT_HOSTNAME = '127.0.0.1';

const http = require('http');
const express = require('express');
const config = require('./config');
const app = express();

var server;

//set express variables
app.set('config', config);
app.set('root', __dirname);
app.set('env', ENV);

require('./config/mongoose').init(app);
require('./config/models').init(app);
//require('./config/passport').init(app);
//require('./config/express').init(app);
require('./config/routes').init(app);

//start the app if not loaded by another module
if (!module.parent) {
	server = http.createServer(app);
	server.listen(
		config.port || DEFAULT_PORT,
		config.hostname || DEFAULT_HOSTNAME,
		() => {
			console.log(`${config.name} is running`);
			console.log(`listening on port : ${config.port}`);
			console.log(`environment : ${ENV.toLowerCase()}`);
		}
	);
}
module.exports = app;