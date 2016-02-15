'use strict';
var util = require('util');

/**
 * HttpResponseError
 * @param {[type]} body            [description]
 * @param {[type]} status          [description]
 * @param {[type]} headers         [description]
 */
module.exports.HttpResponseError = function HttpResponseError (body, status, headers) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = headers['x-error'];
	this.code = headers['x-error-code'];
	this.status = status;
	this.headers = headers;
}

require('util').inherits(module.exports.HttpResponseError, Error);