//models.js

'use strict';

module.exports.init = initModels;

function initModels(app){
	let modelPath = app.get('root') + '/app/models/';
	var modelList = ['contact'];
	modelList.forEach(function(model){
		require(modelPath + model);
	});
}