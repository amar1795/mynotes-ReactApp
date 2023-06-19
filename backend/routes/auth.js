const express=require('express');
const { body, validationResult } = require('express-validator');

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

   user= await User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,    
    })

    res.json(user)
  }
  catch (error)
  {
    res.status(500).send("some error occured")
  }
    
})

module.exports=router;