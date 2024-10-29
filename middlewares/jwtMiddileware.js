const jwt = require('jsonwebtoken')

//middleware
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwtMiddleware");
    //get token from req header "Authorization Key"
    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);   
   //  step to verify
   if(token){
    try{
       const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
       console.log(jwtResponse);
       req.userId = jwtResponse.userId
       next()

       
    }catch{
      res.status(401).json("please login to proceed the step!!! Authentication failed")
    }
   }else{
    res.status(406).json("Authentication failed ... Token missing")
   }
}

module.exports = jwtMiddleware
