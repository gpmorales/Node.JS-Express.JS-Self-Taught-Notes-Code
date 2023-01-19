// Example of how to use export stuff since for Node JS, all files
// are modules by default but we are only required to share the minimum, so atm nothing is global

// Imports[] = require('path to exports call');

//We can import functions and define them with same name

//We can also import variables and objects (li, maps, etc) BUT we must 
//attach them to their module reference

const Imports = require('./NodeBasics1.js');
const sayHi = require('./firstApp.js');

console.log("\n");

console.log(Imports);

console.log("\n");

sayHi(', every node file is a module by default so there no need to export and create links');
sayHi(Imports.name1);
sayHi(Imports.name2);

// NOTE 'require' runs src scripts-> when we import a module we also invoke it
// So we want to only have variables or functions 
// Like an interface essentially or Class rather than a script





