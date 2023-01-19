// Streams are continuous inputs of data
// NOTE In Node we have 4 differnt types of streams
//
// -> Writeable - used to wrtie data sequentially
// -> Readable - used to read data sequentially
// -> Duplex - used to both read AND write data sequentially
// -> Transform - used to modify data when writing or reading
//
// NOTE The Stream interface extends the EventEmitter class as well!

//Useful when input data is very large, such as a million line text file

const { resolve } = require('path');
var Path = resolve(__dirname, 'SubFolder', 'BigFile.txt');

//Lets write a large text file ***
function BasicStreams(){
	const { writeFileSync } = require('fs');
	
	for(let i = 0; i > 10000; i++){
		writeFileSync(Path, "\nHello World " + i, { flag : 'a' });
	}

	const { createReadStream } = require('fs');

	const Stream = createReadStream(Path,
		{
			highWaterMark : 90000,
			encoding : "utf-8"
		});


	//by default we pass in the 'data' event for the on() to listen to
	Stream.on('data', (chunk) => { //on() listens for event, passes in the data obj
		console.log(chunk); //Everytime we console.log(), we select 64KB of data 
	});

	//We can also have the Stream listen to the 'error' event when we parse data simoustaneously 
	Stream.on('error', (err) => { console.log(err); } );

	//NOTE
	//default buffer sizes of data chunks are 64kb -> use highWaterMark
	
}





//****** HTTP Serve Data Stream *******

var HTTP = require('http');
var FS = require('fs');



const Server = HTTP.createServer((request, result) => {
		
		const fileStream = FS.createReadStream(Path,'utf-8');

	  // File Stream on() function listens for different events while
	  // after an object is instantiated from the ReadStream class, which is a child class of the stream.Readable stream
	  // It then performs an action if such an event is emitted from the readStream object
	
	  // In this case, the 'ready' event signals that the first chunk of data is ready to be read
	  // On the other hand 'open' signals that stream has been opened and data can now be piped

		fileStream.on('ready', () => {
			fileStream.pipe(result); //The pipe() function
		});

		fileStream.on('error', (err) => {
			result.end(err);
		});

		fileStream.on('close', (err) => {
			console.log("Done Reading File Input Stream");
		});


		/* If we used the 'data' event of fs.ReadStream to have the server respond w chunks of the data at a time
		fileStream.on('data', (chunk) => {
			result.write(chunk); //The pipe() function
		});
		*/
});

Server.listen(3000);


