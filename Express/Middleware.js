// There are many examples of middleware that can be used to handle
// specific tasks or functionality in web development. Some examples include:

// Express.js: A popular framework for building web applications and APIs.
// It is built on top of Node.js and provides a robust set of features for handling routing, requests, and responses.

// NOTE The use() function in the Express.js framework is used to add middleware functions 
// to the application's request handling pipeline. Middleware functions are functions that 
// have access to the request and response objects, and are able to perform certain operations on those objects before they are passed on to the next middleware function or the final request handler./

const express = require('express'); //import the function, name it
const app = express(); //invoke the function into some var
const Authorize = require('./authorize');

// NOTE -> request => middleware => response 


// Lets say we have the abt page and home page ... and we want to log the method the user is using (GET, PUT, DELETE)
// and the url the user is trying to access ... 
app.get("/", MiddleWare1, (request, response) => {
  /*
  const url = request.url;
  const method = request.method;
  const time = new Date();
  console.log(url); 
  console.log(method);
  console.log(time);
  */
  // YET, what if I have 15 routes on a page, and want to log data like this one each one
  // ... so why dont we set up a callback function that performs these tasks for this routes instead of copying and pasting
  response.status(200).send("Home"); //NOTE -> we must have a response() in this callback
  console.log('first');
});


function MiddleWare1(request, response, next){
  const url = request.url;
  const method = request.method;
  const time = new Date();
  console.log(url); 
  console.log(method);
  console.log(time);
  //NOTE -> IF we dont invoke the Next function, we do not pass onto the next middleware
  //function...we are unable to terminate the middlware pipeline of cmds

  //NOTE TWO OPTIONS -> we invoke next() OR we terminate ourselves 
  next();
  //response.send("Middleware f1"); //terminate our server response w/ send()
}

function MiddleWare2(request, response, next){
  console.log("Second middleware function in pipeline to be executed");
  next();
}

app.get("/resources", (request, response) => {
  response.status(500).send("no middleware used here, app.use() invoked after");
});



// NOTE using the use(), we can simply insert the middleware for all requests
// by just passing in the middleware functions we are looking to pipeline

app.use([Authorize, MiddleWare1, MiddleWare2]); //gets invoked for all routes (we can also pipeline a container of objects)

app.get("/database", (request, response) => {
  response.status(500).send("Our Database");
});


app.get("/products", (request, response) => {
  response.status(500).send("Store");
});


app.get("/about", (request, response) => {
  response.status(500).send("About");
});


app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
