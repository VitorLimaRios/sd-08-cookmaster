const jwt = require('jsonwebtoken');
const UsersModel = require('../models/Users');
const {JWT_SECRET}=require('../services/utils/variableStatus');

const ERROR = {code:401,
  message:'jwt malformed'};

const JWT_validate=async(req,res,next)=>{
  const token = req.headers['authorization'];
  
  if(!token){
    return next(ERROR);
  }
  try{
    const decoded =  jwt.verify(token,JWT_SECRET);
    const {_id} = await UsersModel.findByEmail(Object.values(decoded)[1]);
    
    if (!_id) throw error;
    req.id = { _id };
    
    next();
  }catch{
    return next(ERROR);
  }

};
module.exports={
  JWT_validate
};
