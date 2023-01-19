// Setting up a server using express to display a webpage

const Path = require('path');
const Express = require('express');
const app = Express();

//NOTE MIDDLEWARE
// The app.use() function is used to add middleware functions to your application's request handling pipeline
// The express.static function is a built-in middleware function in the Express.js framework that allows you 
// to serve static files from a specific directory in your application. When a request is made for a file in that directory
// the express.static middleware will check if the file exists and if it does, it will return the file to the client.

app.use(Express.static('./Nav-Bar')); //usually named '/public' 

app.get('/' , (request, response) => {
	response.status(200).sendFile(Path.resolve(__dirname, 'Nav-Bar', 'index.html')); //This is just the html file
	//NOTE we dont need to send the setup html file for our page, we can just include it in our middlware file 
});

//the all method will catch any and all types of requests to our server
app.all('*', (request, response) => {
	response.status(404).send("<h1>Page Not Found</h1>");
});


app.listen(5000, () => {
	console.log("Server is listening to port 5000");
});
