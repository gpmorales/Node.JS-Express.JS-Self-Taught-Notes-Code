// When we dealing w/ many routes + requests handling can become messy
// Our router will group those routes together
const express = require('express');
const router = express.Router();
let { people } = require('./Data');


//HTTP GET method 
router.get('/api/people', (request, response) => { 
  response.status(200).json({success : true, data : people });
});

//HTTP GET method -> read data from user, such a user request for the url path specified below
router.get('/api/people/:id', (request, response) => { 
  const ID = request.params.id;

  if(typeof(Number(ID) == Number)) {
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

router.post('/api/people', (request, response) => { 
  //NOTE we dont have access to the incoming data (json file)
  //the data we want to insert comes in the form of a json file ... we need to parse the body of it... 
  const Name = request.body.name;
  if(Name != undefined){
    return response.status(201).json({ success : true , person : Name }); //{ name : nameValue }
  }

  response.status(400).json({ success : false , msg : "Provide a name value"}); //{ name : nameValue }
});


//NOTE : HTTP DELETE -> deletes data
router.delete('/api/people/:id', (request, response) => {
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

module.exports = router;
