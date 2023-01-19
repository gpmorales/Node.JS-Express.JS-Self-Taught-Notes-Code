/*JavaScript is single-threaded, so how does it handle asynchronous code without blocking the main thread while it waits for an action to complete?
 * The key to understanding the asynchronous nature of JavaScript is understanding the event loop NOTE
 * *** The event loop allows Node.js to perform non-blocking I/O operations ***
 *
 * When Node.js stars, it initializes the event loop, processes the provided input script, which may make async API calls, schedule timers, or call process.nextTick()
 * then begins processing the event loop (WHICH HAS AN ORDER OF OPERATIONS)
 *
 *   NOTE: Order of Ops
 *   ---> [			  Timers      ]  - executes setTimeout() and setInterval() callbacks
 *	 |							|
 *	 |	  [ pending Callbacks ]
 *	 |							|
 *	 |    [   idle, prepare   ]
 *	 |							|
 *	 |    [      Enqueue      ] <----[ RETRIEVE INCOMING : connections, data , requests , etc. ]
 *	 |							|
 *	 |    [			  check			  ]  - setImmediate() callbacks are invoked here
 *	 |							|
 *	 ---- [   close callbacks ]  - some close callbacks (ex: socket.on('close', ...))
 *
 */

//asynchronous sequence of code example
console.log("first task");

setTimeout(() => {
	console.log("next task");
}, 1100);

console.log("second task");



//Quick Callback Review
setTimeout(() => { //Async operation

	function dataFetcher(){
		console.log("... then do stuff with data");
		return true;
	}

	function foo(data, callback){
		console.log("first fetch database, operation that takes some time");
		callback(data);
	}

	foo(12, (dataFetcher) => { // anonymous callback function that passes in another callback function 
		if(dataFetcher){
			console.log("Successful fetch of data");
		}
	});


}, 2000);


// NOTE The Event Handler wil OFFLOAD an async operation, such as a callback,
// run the following task, then once there has been a 'resolved' or 'rejection'
// we then INVOKE the callback function

function Example(){

	console.log("\n"); //NOTE -> Notice how the Event Handler runs this 3rd , after the
	// first two synchronous lines of immediately executable code!

	setTimeout(() => {
		setInterval(() => {
			//CODE WE WANT TO LOOP
			console.log("I was offloaded, so I ran later");
		}, 2000);

		console.log("I will run first");
	}, 3000);

} Example();



