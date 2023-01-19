const express = require('express');
const router = express.Router();
let { people } = require('./Data');

// Common pratice to place middleware handler at top of file 
// so all other routes get access to the functionality and data provided from our middleware pipeline
app.use(express.static('./Public')); //static() is a built-in middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended : false }));
