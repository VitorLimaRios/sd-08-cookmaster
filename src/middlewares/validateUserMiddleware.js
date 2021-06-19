const status = require('../statuscode/status');

// validar os campos obrigatorio
const validateall = (req, res, next) =>{
  const {name, password, email} = req.body;
  if(!name || !password || !email) {
    return res.status(status.BAD_REQUEST).json({message: status.INVALID_ENTRIES});
  }
  next();
};

// validar o email corretamente
const validateEmail = (req, res, next) =>{
  //https://regexr.com/3e48o
  const {email} = req.body;
  const emailRegex =  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; 
  if(email !== emailRegex){
    res.status(status.BAD_REQUEST).json({message: status.INVALID_ENTRIES});
  }
  next();
};

//
module.exports ={
  validateall,
  validateEmail,
};