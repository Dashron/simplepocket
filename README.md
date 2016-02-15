# simplepocket
This is a simple node.js library for the v3 Pocket API (https://getpocket.com/developer/)


# Constructor

`var lib = new Pocket(consumer_key, access_token)`

Consumer key is required, access token is optional.

# Request

```
var response_promise = lib.request('/get', {
	favorite: 1
});

response_promise.then(function (response) {
	console.log(response.body);
})
.catch(function (err) {
	console.log(err);
})
```

**Path** is required, and lines up with the Pocket API's "Method URL". You do not have to include v3 in the path.

**Body** is optional, and should be an object containing all of your request parameters.

**Headers** is optional, and should be an object containing all of your custom request headers.

**Return Value** This function returns a promise. The promise will resolve to a [Response object](#response), or reject with an [HttpResponseError](#HttpResponseError).


# Response

### Body
An object containing all of the response data.

`console.log(resp.body);`

### Status
A number containing the HTTP Response status code.

`console.log(resp.status);`

### Headers
An object containing all the response headers

`console.log(resp.headers);`

### getRateLimit
A function that returns an object containing rate limit information from the response. For more information about rate limits, check out pocket's [rate limit documentation](https://getpocket.com/developer/docs/rate-limits).

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

# HttpResponseError

The HttpResponseError contains important information about why your request failed. For more information about pocket errors, check out their [error page](https://getpocket.com/developer/docs/errors)

### Message

`console.log(err.message);`

### Code

`console.log(err.code);`

### Status

`console.log(err.status);`

### Headers

`console.log(err.headers);`


# TODO:
Authentication
Clean up docs
Tests