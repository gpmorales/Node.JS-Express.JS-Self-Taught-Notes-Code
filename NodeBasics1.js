// GLOBAL -> No Windows in Javascript
// But there are global variables such as these ->
//
// __dirname = path to current directory
// __filename = filename
// require = function to use with modules (CommonJS)
// module = info about the current module in use
// process = info about environment where program is being executed 
//

console.log("Path -> " + __dirname);
console.log("Path -> " + module); //The Object class is a module that is imported by default

function LoopFunction(Message){

	setInterval(() => {

		console.log("Hello World...This is your message"); //Callback function
		console.log(Message); //Callback function

	}, 1000); //Repeat every 1000 miliseconds

}


// MODULES
// CommonJS -> every file is a module (by default)
// Modules allow us to encapsulate code -> reusable anywhere else we import the file/module into

const name1 = "Bob";
const name2 = "John";

const sayHi = (name) => {
	console.log("Hi " + name);
}


function Foo(){
	sayHi('Susan');
	sayHi('John');
	sayHi('Peter');
}

//HOW TO EXPORT DATA

//List Container with all the variables or functions we wish to export
module.exports = { name1, name2 };

//We can export as 'we go'

module.exports.List = [ "1", "2", "3", "4" ];

//Maps (Dictionaries) in JS are similar to those in Python syntatically
const Persons = {
	name : "Goerge",
	age : 20,
	networth : 0
}

module.exports.person = Persons;




// MODULES CONTINUED
// we can import default modules this way ->

function OSmodule(){

	const os = require('os');
	console.log(os.userInfo());

	console.log("\n");
	// More os properties and functions
	// inside a Map

	const currentOS = {
		name : os.type(),
		release : os.release(),
		totalMem : os.totalmem(),
		freeMem : os.freemem(),
	}

	console.log(currentOS);

}




// PATH MODULE -> Node allows us to interact with file systems and paths

function Pathmodule(){
	const path = require('path'); //This is how we import the path module

	console.log(path.sep); //This is just the slash -> arbul/Desktop/Node Stuff

	const filePath = path.join('/Website Basics','Node Course','text.txt');

	console.log(filePath);

	//If you want to access the base of a path (the final element) 
	const Base = path.basename(filePath);
	
	console.log(Base + "\n");

	const Absolute = path.resolve(__dirname, 'SubFolder', 'text.txt');

	console.log(__dirname + '\\text.txt'); //Absolute path to a file or folder

} // Pathmodule();




// FILE SYSTEM MODULE -> Sync (Non - Blocking) & Async (Blocking)
function FSmodule(){

	//This is how we can import functions/modules:
	
	//const {readFileSync, writeFileSync} = require('fs'); //Import specific functions/properties in container OR
	const Path = require('path'); //This is how we import the path module
	const FS = require('fs');

	//readFileSync has two parameters -> a path and the encoding type of the file
	
	const filePath1 = Path.resolve(__dirname, 'SubFolder', 'text.txt' );
	const filePath2 = Path.resolve(__dirname, 'SubFolder', 'first.txt' );
	
	//Read file content
	const TextFile1 = FS.readFileSync(filePath1, 'utf8');
	const TextFile2 = FS.readFileSync(filePath2, 'utf8');

	console.log(TextFile1, TextFile2);


	//Write files -> writeFileSync("file path", "Content");

	const newFilePath = Path.resolve(__dirname, 'SubFolder', 'result-sync.txt');

	//Will overide content of existing file
	FS.writeFileSync(
		newFilePath, 
		"This was created inside a Node script! \n " + TextFile1 + TextFile2,
		{flag : 'a' } //Appends new content
	);

} //FSmodule();




//Asynchronous file Reading and Writing
function AsyncFS(){

	console.log("Start Tasks");

	const Path = require('path');
	const { readFile, writeFile } = require('fs');

	const filePath = Path.resolve(__dirname, 'SubFolder', 'text.txt' );

	//Async function that has reject/resolve callbacks (we are passing functions inside another functions args)
	//These are inherit to async funcionts like readFile
	readFile(filePath, "utf8", (error, result) => {
		if(error){
			console.log(error);
			return;
		}

		const firstFileContent = result; //returns a buffer if encoding isnt set

		const FP = Path.resolve(__dirname, 'SubFolder', 'first.txt' );

		readFile(FP, "utf8", (error, result) => {
			if(error){
				console.log(error);
				return;
			}

			/*NOTE*/ const secondFileContent = result;

			// Writing a new File is simple => (path, content, callbacks() => (error, SuccessResult) => {} )
			const newFilePath  = Path.resolve(__dirname, 'SubFolder', 'AsyncWritten.txt');

			writeFile(newFilePath,
				"Here is the merged result " + firstFileContent + secondFileContent,
				(error,result) => { //Async functions must always pass the 
					if(error){
						console.log(error);
						return;
					}
					console.log("Done with creation of new file");
				}
			);

		});

	});


	console.log("Starting next task");

} //AsyncFS();



//EXAMPLE OF HOW TO USE PROMISES WITH AN ASYNC FUNCTION LIKE writeFile
const Path = require('path');
const FS = require('fs');

function FileWriter(path1){
	
	//NOTE Promise is an object that is returned for async operations that must be performed WITHIN it itself
	// The resolve and reject functions are callbacks for the Promise arguments and the object uses them to signal the completion of a async operation
	return new Promise((resolve, reject) => {
		FS.writeFile(path1, "Hello Mundai", (err,result) => {
			if(err){
				reject(err); //This function is called when the async operation fails
			}
			else{
				resolve(); //This function is called when the async operation succeeds 
			}
		});
	});

} 

const path1 = Path.resolve(__dirname, 'SubFolder', 'Alt.txt');


FileWriter(path1).then(() => console.log("Success")).catch((err) => console.log(err));
// NOTE Notice that than passes in an anonymous callback function with no parameters pertaining to how resolve has no parameters
// AND catch passes in an anonymous callback function with one parameter pertaining to how we used the reject() function in this  case



//uSING THE ASYNC AND AWAIT KEYWORDS INSTEAD
async function FileReader(path2){
	try{
		const data = await new Promise((resolve, reject) => { //await is used to pause the execution of the function until the Promise is resolved , rmbr promise is a object returned for an async operation
			FS.readFile(path2, "utf8", (err, result) => {
				if(err){
					reject(err); //This function is called when the async operation fails
				}
				else{
					resolve(result);  //This function is called when the async operation succeeds
				}
			});
		});

		console.log(data);
	}
	
	catch(error){
		console.log(error);
	}

}

FileReader(Path.resolve(__dirname, 'SubFolder', 'Alt.txt'));
