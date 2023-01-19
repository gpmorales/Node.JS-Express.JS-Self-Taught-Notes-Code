// This is part TWO of my NODE BASICS notes and script
// Good intro to core mechanics behind how to wrtie and grab data frommechanics /to databases

const HTTP = require('http'); //This will alllow to build simple server interface

// the createServer function creates an HTTP server tha listens for incoming requests
// Passes in two functions as arguments -> req and resp
//... request -> an event that is emitted each time there is an incoming request from a client
//... response -> our response (an object that is an instance of the http.ServerResponse class)
const WebServer = HTTP.createServer((request, response) => { 

	//console.log(request); //This is the request object
	
	// Does not automatically pull up
	// since the WebServer is waiting for the request (for us to visit or interect with the site)
	// the request.url property tells us from which address the client is requesting to interact with our server 

	if(request.url === "/"){ //If the client's request is to be directed to the home page 
		response.write('Welcome to the AirEmory home page');
		response.end();
	}

	else if( request.url === "/about" ){ //If the client DOES NOT request to be directed the home page, but perhaps an about page
		response.write('About Us ... ');
		response.end();
	}

	else response.end( //Otherwise our default response to a response can be DIRECT HTML <- NOTE
		'<h1> This Page Does Not Exist </h1><br> <p> Can not seem to reach the page your looking for :/ (May Not Exist) </p>'
	);

	//response.write('Hello, welcome to our database');
	//response.end();

});


WebServer.listen(5000); //Which port our server is listening to... is an asychronous operation that does not terminate as
//the page is constantly listening for new requests 


function DependencyEx(){ //We have the package.json file which lists the libraries we have installed and have access to

	const LodAsh = require('lodash');

	const items = [ 1 , [ 2 , [ 3 , [ 4 ] ] ] ];

	const flatArray = LodAsh.flattenDeep(items);

	console.log(flatArray);

} DependencyEx();
