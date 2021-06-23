const jwt = require('jsonwebtoken');

const secret = 'nosso segrego do jwt';

const validateToken = (token)=>{
  try{
    return jwt.verify(token, secret);
  }catch(_err){
    return null;
  }
};

module.exports = validateToken;
