// Using Node and Express to interact with the web via servers...
// How do we exchange data on the internet?
//
// NOTE ->
// HTTP Message Architecture
//
// [Your Local Machine] -------> request -------> [ Cloud / Server ]
// [                  ]	<------- response ------< [                ]
//
//
// The user sends the HTTP.request message && the server sends the HTTP.respond message
//
// ***************************************************************************************************************
// HTTP REQUEST STRUCTURE :																	 HTTP RESPONSE STRUCTURE :
//
//  [ GET /contact url HTTP/1.1 ]														  [ HTTP/1.1  Status code  Status Text ]
//	[ 			   Headers		 		  ]														  [							  Headers					     ]
//	[		      Body(opt)         ]														  [							 Body(opt)					   ]
//
//	Request Url : http://wwww.youtube.com										  Request Url : http://youtube-server.app
//	Request method : GET																		  Request method : POST
//	Status Code : 200 OK																		  Status Code : 400 OK (or 404 Error when we response fails to find addr etc)
//	Remote Address : 138.68.239.6:443												  Remote Address : 104.248.78.24:443
//
//  Header {																								  Header {
//			pragma : no-cache																				Content-type : text/html; charset = UTF-8
//			referer : http://www.myhomepage.com											Content-type : application/json; charset = UTF-8
//  }																												  }
//
//  Body{																										  Body{
//			Request payload :																				  <html>
//			email, acct, etc																						 <head>
//	}   																															 ...
//																																	 </head>
//
//																																	 <body>
//																																	  <h>Welcome to YouTube</h>
//																																	  ...
//																																	 </body>
//  																														  </html>
//  																												  }
//
// We will set up a server thats sends a correct response to a HTTP GET request
//
// NOTE HTTP Methods:
//
//  GET  -> Read data
//  POST -> Insert data
//  PUT  -> Update data
//  DELETE ->  Delete data
//

const HTTP = require('http'); //Quick intro into why we would use a framework like Express for web-server interfacing
const Path = require('path');
const FS = require('fs');


//This function's callbacks are invoked when the server recieves a HTTP GET request
const server = HTTP.createServer((request, response) => {
  //Type of request our user is sending to our server
	console.log(request.method);

	const url = request.url; //url our request is sending to our server

	if(url === "/"){

		const FP = Path.resolve(__dirname, "Simple.html");
		const htmlFile = FS.readFileSync(FP);

		response.writeHead(200, { 'content-type' : "text/html" } ); //writes a Header for which we specify the type -> what the browser returns response.writeHead(200, { 'content-type' : "text/plain" } );
		//We can also pass in html file via tha path
		response.write(htmlFile);

		response.end(); //end() must be included as it signals to the server that the request has been complete
	}


	else if( url === "/about"){
		response.writeHead(200, { 'content-type' : "text/html" } ); 
		response.end("<h1>About Page</h1>");
	}

	else{ //Error, let the server send a status code of 404
		response.writeHead(404, { 'content-type' : "text/html" } ); 
		response.end("<h1>Page Not Found</h1>");
	}
	
	
});

server.listen(5000);

// Common Port Numbers:
// 20 - FTP (file transfer protocol)
// 194 - IRC (Internet Relay Chat)
// 443 - HTTP secure (hypertext transfter protocol)

