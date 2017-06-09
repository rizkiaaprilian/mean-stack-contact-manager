//routes.js

'use strict';
module.exports.init = initRoutes;

function initRoutes(app){
	let routePath = app.get('root') + '/app/routes';
	app.use('/api', require(routePath + '/contacts'));
}