# simplepocket
This is a simple node.js library for the v3 Pocket API (https://getpocket.com/developer/)


# Constructor

`var lib = new Pocket(consumer_key, access_token)`

Consumer key is required, access token is optional.

# Request

`var response_promise = lib.request(path, body, headers)`

**Path** is required, and lines up with the Pocket API's "Method URL". You do not have to include v3 in the path.

`lib.request('/get', {
	favorite: 1
});

**Body** is optional, and should be an object containing all of your request parameters.

**Headers** is optional, and should be an object containing all of your custom request headers.

**Return Value** This function returns a promise. The promise will resolve to a Response object, or reject with an HttpResponseError.


# Response

### Body
An object containing all of the response data.

### Status
A number containing the HTTP Response status code. Pocket lists 

### Headers
An object containing all the response headers

### getRateLimit
A function that returns an object containing rate limit information from the response

```
var limits = resp.getRateLimit();

// Limit information related to the current API Application

// Maximum amount of requests you can make in the limit time window
limits.app.limit;
// Amount of requests you can still make within the limit time window
limits.app.remaining;
// Time in seconds until the limit resets
limits.app.reset;

// Limit information related to the current authenticated user

// Maximum amount of requests you can make in the limit time window
limits.user.limit;
// Amount of requests you can still make within the limit time window
limits.user.remaining;
// Time in seconds until the limit resets
limits.user.reset;
```


# TODO:
Authentication
Clean up docs
Tests