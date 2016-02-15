"use strict";

/**
 * [exports description]
 * @param  {[type]} body    [description]
 * @param  {[type]} status  [description]
 * @param  {[type]} headers [description]
 * @return {[type]}         [description]
 */
var Response = module.exports = function Response (body, status, headers) {
	this.body = JSON.parse(body);
	this.status = status;
	this.headers = headers;
}

Response.prototype.body = null;
Response.prototype.status = null;
Response.prototype.headers = null;

/**
 * [getRateLimit description]
 * @return {[type]} [description]
 */
Response.prototype.getRateLimit = function () {
	return {
		app: {
			limit: this.headers['x-limit-key-limit'],
			remaining: this.headers['x-limit-key-remaining'],
			reset: this.headers['x-limit-key-reset']
		},
		user: {
			limit: this.headers['x-limit-user-limit'],
			remaining: this.headers['x-limit-user-remaining'],
			reset: this.headers['x-limit-user-reset']
		}
	};
}