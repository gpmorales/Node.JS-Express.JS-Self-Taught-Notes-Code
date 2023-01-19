// Event driven programming is heavily utilized in Node.js 
// We are constantly waiting for events, for a user to make a request to pull data from a data base
// , for website interactions, and much more

const EventEmitter = require('events'); //The Events module will allow us to load
// the class which we is usually call 'Event Emitter'
// To create a custom event, we need to extend the class
// Otherwise we can just use this default instance of the Event module


const customEmitter = new EventEmitter();

// the Emitter class instance has many methods but the ones we are most concerned with are ->
// emitterObj.on() - listen for an event
// emitterObj.emit() - emit an event

//on(event: string | symbol listener : any args => void)
// We can name our evnet wtv we want
// We also pass in a function that is invoked when we get a response 

// NOTE OREDER MATTERS -> we must turn on event listener before we begin emitting events
// Listens to the 'response' event
customEmitter.on("response", (userName, ID) => { 
	console.log('data recieved!');
	console.log('Anonymous f() with object parameters');
	console.log(userName);
	console.log(ID);
});

//we can have muiltple responses to same event
customEmitter.on("response", () => { 
	console.log('some other logic here');
});

customEmitter.emit('response', 'Gpmoral', 2486); //Pass in the event name we emit



//******** A SERVER - EVENT IMPLEMENTATION ********

const HTTP = require('http');

const customServer = HTTP.createServer(); //Instantiate server Object

//Servers can also emit events when we instantiate them by using the on() function
customServer.on("Server up", (request, result) => {
 //request is a callback function that we use to communicate when a user interacts w/ our server port
 //result is for what our server will return/emit 
	if(request.url === "/"){
		result.write("<p>Welcome</p>");
	}

});

customServer.listen(5000, () => {
	console.log("Server is currently live");
});

