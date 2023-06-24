const express=require('express');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET="hellobrother";

const router=express.Router();
const User=require("../models/User")
 
//for creating a user with the endpoint without logging in POST:"/api/auth/createuser"
router.post('/createuser',[
    body('name',"enter a valid name").isLength({min:3}),
    body('email',"enter a valid email").isEmail(),
    body('password',"enter a valid password").isLength({min:5}),
    
],
async (req,res)=>{
    const result = validationResult(req);
  if (!result.isEmpty()) {
    
     return res.status(400).send({ errors: result.array() });
  }

  try {
  let user= await User.findOne({email:req.body.email})
  if(user){
    return res.status(400).json({error:"sorry a user with this email already exists"})
  }

  var salt = await bcrypt.genSaltSync(10);

  const secPass= await bcrypt.hash(req.body.password, salt);

   user= await User.create({
      name:req.body.name,
      email:req.body.email,
      password:secPass,    
    })

    const data={
        user:{
            id:user.id
        }
    }

    var authtoken = jwt.sign(data, JWT_SECRET);

    res.json({authtoken})
  }
  catch (error)
  {
    res.status(500).send("some error occured")
  }
    
})


//login endpoint ,login not required ,logging in POST:"/api/auth/login"
router.post('/login',[
  body('email',"enter a valid email").isEmail(),
  body('password',"password cannot be blank").exists(),
  
],
async (req,res)=>{
  //adding data validation using express validator
  const result = validationResult(req);
if (!result.isEmpty()) {
  
   return res.status(400).send({ errors: result.array() });
}

//fetching email and password using destructuring
const{email,password}=req.body;

try {
let user= await User.findOne({email:req.body.email})
if(!user){
  return res.status(400).json({error:"please enter the correct credentials"})
}

const passwordCompare=await bcrypt.compare(password,user.password);
if(!passwordCompare){
  res.status(400).json({error:"please try to login with the correct credentials"})
}

  const data={
      user:{
          id:user.id
      }
  }

  var authtoken = jwt.sign(data, JWT_SECRET);

  res.json({authtoken})
}
catch (error)
{
  console.error(error.message);
  res.status(500).send("some error occured")
}
  
})

module.exports=router;