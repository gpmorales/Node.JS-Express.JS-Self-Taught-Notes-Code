function first(){

	const Amount = 12;

	if(Amount > 10){
		console.log("Node is a runtime that allows you to run Javascript on the server-side rather\nthan on the traditional browser-based applications");
	}

	else{
		console.log("I hate you");
	}

}


const sayHi = (name) => {
	console.log("I hate " + name);
}


console.log(sayHi("you"));

module.exports = sayHi;
