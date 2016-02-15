"use strict";
var errors = require('./errors');
var https = require('https');
var Response = require('./response.js');

/**
 * [exports description]
 * @param  {[type]} consumer_key [description]
 * @param  {[type]} access_token [description]
 * @return {[type]}              [description]
 */
var Pocket = module.exports = function Pocket (consumer_key, access_token) {
	if (!consumer_key) {
		throw new Error("The first parameter of the Pocket object's constructor must be your consumer key");
	}

	this.consumer_key = consumer_key;

	if (access_token) {
		this.access_token = access_token;
	}
}

Pocket.prototype.consumer_key = null;
Pocket.prototype.access_token = null;
Pocket.prototype.request_defaults = {
	hostname: 'getpocket.com',
	headers: {
		'x-accept': 'application/json',
		'content-type': 'application/json; charset=UTF-8',
	},
	method: 'POST'
}

Pocket.prototype.url_version = 'v3';

/**
 * [request description]
 * @param  {[type]} method  [description]
 * @param  {[type]} path    [description]
 * @param  {[type]} body    [description]
 * @param  {[type]} headers [description]
 * @return {[type]}         [description]
 */
Pocket.prototype.request = function (path, body, headers) {
	var pocket_lib = this;

	return new Promise(function (resolve, reject) {
		var req = https.request(pocket_lib._buildOptions(path, body, headers), (res) => {
			var response_buffer = '';

			res.on('data', (d) => {
				response_buffer += d;
			});

			res.on('end', () => {
				if (res.statusCode === 200) {
					resolve(new Response(response_buffer, res.statusCode, res.headers));
				} else {
					reject(new errors.HttpResponseError(response_buffer, res.statusCode, res.headers));
				}
			});
		});

		req.write(pocket_lib._buildBody(body));
		req.end();

		req.on('error', (e) => {
			reject(e);
		});
	});
}

/**
 * [_buildOptions description]
 * @param  {[type]} method  [description]
 * @param  {[type]} path    [description]
 * @param  {[type]} body    [description]
 * @param  {[type]} headers [description]
 * @return {[type]}         [description]
 */
Pocket.prototype._buildOptions = function (path, body, headers) {
	path = this._normalizePath(path);

	if (!headers) {
		headers = {};
	}

	headers['x-accept'] = this.request_defaults.headers['x-accept'];
	headers['content-type'] = this.request_defaults.headers['content-type'];

	var options = {
		hostname: this.request_defaults.hostname,
		headers: headers,
		path: path,
		method: this.request_defaults.method
	};

	return options;
};

/**
 * Ensures that the path provided to the request method always matches the pattern of /{version}/{path}/{parts}/{etc...}
 * @param  string path
 * @return String
 */
Pocket.prototype._normalizePath = function (path) {
	if (path.charAt(0) !== '/') {
		path = '/' + path;
	}

	if (path.indexOf(this.url_version) === -1) {
		path = '/' + this.url_version + path;
	}

	return path;
}

/**
 * [_buildBody description]
 * @param  {[type]} body [description]
 * @return {[type]}      [description]
 */
Pocket.prototype._buildBody = function (body) {
	if (!body) {
		body = {};
	}

	body.consumer_key = this.consumer_key;
	
	if (this.access_token) {
		body.access_token = this.access_token;
	}

	return JSON.stringify(body);
}