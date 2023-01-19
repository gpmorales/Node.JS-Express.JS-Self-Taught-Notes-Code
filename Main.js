//In javascript, a package refers to a bundle of reusalbe code
// and npm (node package manager) allows us to install and use dependencies (libraries/modules)
// in our projects and codes

//To use our dependencies -> same as importing a module => const ModTool = require('module');

const LodAsh = require('lodash');


const items = [ 1 , [ 2 , [ 3 , [ 4 ] ] ] ];

const flatArray = LodAsh.flattenDeep(items);

console.log(flatArray);

console.log("Hi.");
