var Pocket = require('../index.js').Pocket;
var config = require('./config.json');

var lib = new Pocket(config.consumer_key, config.access_token);
lib.request('/get')
	.then(function (response) {
		console.log('successful response');
		console.log(response);
	})
	.catch(function (err) {
		console.log(err.stack);
	});