// More complex Express Topics .... 
// API (HTTP Interface to interact w our data) vs SSR (Server Side Rendering)
//
// - API -> The data is sent using JSON (Javascript Object Notation)
// - To return our response/send DATA, we will use RES.JSON() method -> Strinfy our data or set up proper content type 
// 
// - SSR -> We will set up templates to send entire css, html, and js files ourselves
// - Will accomplish this using RES.RENDER() method
//
//

//const { stringify }  = require("./node_modules/json-stringify-pretty-compact/index.js");
const express = require('express');
const app = express();
const { products, people } = require("./Data.js");


//NOTE:
//JSON files are often used to transmit data between a server and a web application
//, as well as between different parts of a web application. They are also commonly used to store configuration settings and data for software programs and more
app.get('/', (request, response) => {
	response.status(200).send("<h1>Home Page</h1><a href = '/products'> Products Page </a>");
});


//Modifying the data from our JSON file before we send it when we receive a "GET" request
app.get('/api/products', (request, response) => {
	//NOTE -> map() creates a new container with the same number of elements, BUT with each element transformed according to a CALLBACK function
	const newProducts = products.map((ProductMaps) => {
		const {id, name, price} = ProductMaps; //we will transform each Dictionary to just contain the id, name, and price 
		return {id, name, price};
	}); 

	response.json(newProducts); //This method sends a JSON file that is then converted to a string / consists of key-value pairs
});


//NOTE: The querying of data from our JSON file is done by using the find() method of our 
//What if the store site has hundreds of products... we would need to repeat this method many times
app.get('/api/products/1', (request, response) => {
	const singleProduct = products.find((product) => product.id == 1);
	response.json(singleProduct);
});

app.get('/api/products/2', (request, response) => {
	const singleProduct = products.find((product) => product.id == 2);
	response.json(singleProduct);
});


//...This will become very inefficient if we have many routes within in our website
//NOTE We can use ROUTE PARAMETERS INSTEAD -> placeholder in the url route for some user input data 
app.get('/api/products/:productID', (request, response) => {
	const productID = request.params.productID; //request param maps the route information
	//...for any generic route, in this case with the given name productID
	const someProduct = products.find((product) => product.id == Number(productID));

	if(someProduct == undefined){
		return response.status(404).send("Product Does Not Exist");
	}

	response.status(200).json(someProduct);
});
//NOTE WE can chain MULTIPLE parameters in ONE ROUTE
// EX -> /products/:productID/reviews/:reviewID 



//NOTE
//Query String Parameters / URL parameters => we can send small amts of data to the server
// we are responsible for setting up these filter like the .../search?query=mensshoes
// or .../search_by_date?tags=post, etc

app.get('/api/v1/query', (request, response) => {
	//returns the parameters which we can the query from our JSON file or somwhere from the website
	console.log(request.query);
	const { search , limit } = request.query;
	let sortedProducts = [...products]; //the ... => spread operator

	if(search != undefined){
		//list filer method in js
		sortedProducts = sortedProducts.filter((prod) => {
			return prod.name.startsWith(search); //This will return only certaion objects back into our container
		});
	}

	if(limit != undefined){
		sortedProducts = sortedProducts.slice(0,Number(limit));
	}

	if(sortedProducts.length < 1){
		//response.status(200).send('no products matched search');
		return response.status(200).send({ sucess : true , data : [] });
		// NOTE return otherwise we will have 2 send requests and this will cause an error
	}

	response.status(200).send(sortedProducts);

});


//Handling all other requests 
app.all('*', (request,respond) => {
	respond.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(5000, () => {
	console.log("Server is now listening to port 5000...");
});

//END OF FILE
