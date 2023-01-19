// Express is framework for minimalist web design built on top of Node.js

const express = require('express'); //We retrieve the main function from express and we can then invoke it
const App = express();

//OR alternatively, we can invoke the express function in one line
//const app = require('express')();

// Our responses when the server receives a 'get' request for the specified url path
App.get('/', function(request, result) {  // The get() function takes in the path url that is being requested and a callback that consists of two other functions
	result.status(200).send("This is the home page");
});

App.get('/database', function(request, result) {  // The get() function takes in the path url that is being requested and a callback that consists of two other functions
	result.status(200).send("<h1>Airly Database</h1>");
});

App.get('/About', function(request, result) {  // The get() function takes in the path url that is being requested and a callback that consists of two other functions
	result.status(200).send("<h3>About Page</h3>");
});


//Our response to when our server recieves a get, post, delete, put, or any other request
// parameters include a url path and a callback
App.all('*', (request, result) => {
	result.status(404).send("<h1>Page Not Found</h1>");
	
});


App.listen(5000, ()=>{ // After we prepare our response we can then tell the server to listen to incoming requests
	console.log("Server is listening on port 5000");
});


// Express functions
// App.get
// App.post
// App.put
// App.delete
// App.all
// App.use
// App.listen



