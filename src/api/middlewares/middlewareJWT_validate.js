const jwt = require('jsonwebtoken');
const UsersModel = require('../models/Users');
const {JWT_SECRET,UNAUTHORIZED}=require('../services/utils/variableStatus');

const ERROR_MALFORMED = {code:UNAUTHORIZED,
  message:'jwt malformed'};

const ERROR_EMPTY = {code:UNAUTHORIZED,
  message:'missing auth token'};


const JWT_validate=async(req,res,next)=>{
  const token = req.headers['authorization'];
  
  if(!token){
    return next(ERROR_EMPTY);
  }
  try{
    const decoded =  jwt.verify(token,JWT_SECRET);
    const {_id} = await UsersModel.findByEmail(Object.values(decoded)[1]);
    
    if (!_id) throw error;
    req.id = { _id  };
    req.tipeUser = decoded;
    
    
    next();
  }catch{
    return next(ERROR_MALFORMED);
  }

};
module.exports={
  JWT_validate
};
