const express=require('express');
const { body, validationResult } = require('express-validator');

const router=express.Router();
const User=require("../models/User")
 

router.post('/',[
    body('name',"enter a valid name").isLength({min:3}),
    body('email',"enter a valid email").isEmail(),
    body('password',"enter a valid password").isLength({min:5}),
    
],
(req,res)=>{
    const result = validationResult(req);
  if (!result.isEmpty()) {
    
     return res.status(400).send({ errors: result.array() });
  }

 
  User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,    
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
    res.json({error:"please enter the a unique email",message:err.message})})
    
    
})

module.exports=router;