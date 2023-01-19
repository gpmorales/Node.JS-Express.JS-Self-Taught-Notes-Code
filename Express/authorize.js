// More Middleware
//

const authorize = function(request,response,next){
  const { user } = request.query;
  if(user == 'john'){
    request.user = { name : 'john' , id : 4 };
    next(); //moves on to the next middleware function
  }
  else{
    console.log("Middleware pipeline terminated, sending response...");
    response.status(401).send('Not authorized');
  }
}
 

module.exports = authorize;
