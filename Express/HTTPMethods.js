//GET HTTP Method we have covered
const express = require('express');
const app = express();
let { people } = require('./Data');

// Common pratice to place middleware handler at top of file 
// so all other routes get access to the functionality and data provided from our middleware pipeline
app.use(express.static('./Public')); //static() is a built-in middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended : false }));

//NOTE ->
// express.json() function is a built-in middleware function in the Express.js web framework 
// that parses incoming request bodies in the JSON format and makes the resulting object
// available as req.body property on the request object. It is typically used to handle JSON-encoded request bodies
// such as those sent by an API client when creating or updating resources
//NOTE -> the express.urlencoded() is a built-in middleware function that parses incoming requests w encoded payloads ... based on body-parses


//HTTP POST method -> upload data to the server ***************************************

//NOTE TRADITIONAL FORM -> IN OUR HTML DOC, OUR FORM ELEMENT contains an 'action' attribute
//that specifies the URL that the form data will be sent to (/login) 
//WHILE the "method" attribute specifys the method that will be USED to submit this data (POST)
app.post('/login', (request, response) => { 
  // data comes from our user request and POST it to the specified URL path (/login)
  // NOTE we dont have access to the data we posted atm -> solution use MIDDLEWARE
  // We can parse the header now 
  const Name = request.body.name;
  if(Name){
    console.log(Name);
    return response.status(200).send("We completed the POST request");
  }

  response.status(401).send("Please provide a name");
});


//JAVASCRIPT METHOD -> we use express.json() to parse our json object that the user is uploading (the request payload)
app.post('/api/people', (request, response) => { 
  //NOTE we dont have access to the incoming data (json file)
  //the data we want to insert comes in the form of a json file ... we need to parse the body of it... 
  const Name = request.body.name;
  if(Name != undefined){
    return response.status(201).json({ success : true , person : Name }); //{ name : nameValue }
  }

  response.status(400).json({ success : false , msg : "Provide a name value"}); //{ name : nameValue }
});



//HTTP GET method -> read data from user, such a user request for the url path specified below
app.get('/api/people/:id', (request, response) => { 
  const ID = request.params.id;

  if(typeof(Number(ID))) {
    const newPeople = people.filter((item) => {
      if(item.id == Number(ID)){
        return item;
      }
    });

    return response.status(200).json({success : true, data : newPeople});
  }

  response.status(401).json({success : true, data : "Please provide valid ID"});
  // In our javscript/html script, the line : 
  // const { data } = await axios.get('/api/people') --> allows us to parse data from the JSON response to /api/people 
});


//HTTP GET method 
app.get('/api/people', (request, response) => { 
  response.status(200).json({success : true, data : people });
});


//NOTE : HTTP PUT method -> update data -> USE QUERY PARAMETERS
app.put('/api/people/:id', (request, response) => {
  const fetchedID  = request.params.id; //get id from our request parameters
  const fetchedData = request.body.name; //get the person name from a JSON object 
  //we send via Postman
  
  //OR we can update the current data using our own JSON file...
  /*
  let { updatedData } = require('./Data');
  const fetchedID = updatedData[0].id
  const fetchedData = updatedData[0].name;
  */

  const Person = people.find((person) => person.id == Number(fetchedID));

  if(!Person){
    return response.status(401).json({ success : false, msg : "No person with such ID"});
  }

  const newPeople = people.map((person) => {
    if(person.id == Number(fetchedID)){
      person.name = fetchedData;
    }
    return person;
  });

  console.log(newPeople);
  response.status(200).json({success: true, data : newPeople});

});


//NOTE : HTTP DELETE -> deletes data
app.delete('/api/people/:id', (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  const Person = people.find((person) => person.id == Number(id));

  if(!Person){
    return response.status(401).json({ success : false, msg : "No person with such ID"});
  }

  const newPeople = people.filter((person) => {
    if(person.id != Number(id)){
      return person;
    }
  });

  console.log(newPeople);
  return response.status(200).json({success: true, data : newPeople});

});


app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
