//Async patterns -> Other asynchronous techniques to write cleaner code

const FIO = require('fs');
const Path = require('path');
const Util = require('util');

const absPath1 = Path.resolve(__dirname, 'SubFolder', 'Alt.txt');
const absPath2 = Path.resolve(__dirname, 'SubFolder', 'first.txt');
const absPath3 = Path.resolve(__dirname, 'SubFolder', 'SomeAsyncPr.txt');


// Sync function that returns promise object
function getText(absPath){
	 return new Promise((resolve, reject) => {
		//Async Function readFile()
		FIO.readFile(absPath, "utf-8", (error, data) =>{ //param include an anonymous callback function that passes in 2 other callback functions
			if(error){
				reject(error);
			}
			else{
				resolve(data);
			}
		});

	});
}


async function NewTextToPath(newPath){
	try{
		const text1 = await getText(absPath1);
		const text2 = await getText(absPath2);
		const newText = text1 + " -> " +  text2;

		FIO.writeFile(newPath, newText , (error, result) => {
			if(error){
				console.log("Error - could not write to specified file");
			}

			else{
				console.log("Success");
				//getText(newPath).then((data) => console.log(data)).catch((err) => console.log(err));
				//Alt
				
				const FinalMsg = async() => {
					const text = await getText(newPath);
					console.log(text);
				}

				FinalMsg();
			}

		});

	}

	catch(error){
		console.log(error);
	}

}


//NOTE Alternative -> use the promisify function from the 'util' module of Node.js
// It converts a CALLBACK-BASED function such as readFile((error,result) ...) 
// where the last arg is a callback and makes into a promise based function

async function PromisfyFunctions(){
	//Define the new promise based readFile/writeFile functions using the util module
	const readFilePromise = Util.promisify(FIO.readFile);
	const writeFilePromise = Util.promisify(FIO.writeFile);

	//retrieve the data from our async, promised based functions which have the same parameters
	//but exclude the final callback!
	const t1 = await readFilePromise(absPath1, "utf-8");
	const t2 = await readFilePromise(absPath2, "utf-8");
	
	//Wait for the promise-writeFile() to terminate
	await writeFilePromise(absPath3, t1 + " >>>> " + t2);

	//Read our final msg
	const writeMsg = await readFilePromise(absPath3, "utf-8");
	console.log(writeMsg);

}


PromisfyFunctions();
//NewTextToPath(absPath3);
