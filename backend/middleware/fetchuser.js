var jwt = require('jsonwebtoken');
const JWT_SECRET="hellobrother";


const fetchuser=(req,res,next)=>{
    //getting the user from jwt token and fetching the user id
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid jwt token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);  
        req.user=data.user;
        next();  
        
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid jwt token"})
    }

}

module.exports=fetchuser;