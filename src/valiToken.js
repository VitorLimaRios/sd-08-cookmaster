const jwt = require('jsonwebtoken');
const secret = 'segredosecreto';
const Users = require('./models/userModel');

const UNAUTHORIZED = 401;
const validator = async(req,res,next)=>{
  
  try {
    const token = req.headers.authorization; 
  
    if(!token) return res.status(UNAUTHORIZED).json({message:'missing auth token'});

    const decode = jwt.verify(token,secret);
    
    const user = await Users.findUser(decode.data.email);

    if(!user) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports=validator;
