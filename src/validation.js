const Users = require('./models/userModel');


const BAD_REQUEST = 400;
;
const ERR_409 = 409;

const validation = async (req,res,next)=>{

  const {email,name,password,_role} = req.body;
  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  let emailValid = emailValidation.test(email);
 
  let emailExist = await Users.findEmail(email);
 
  if(!email){
    return res.status(BAD_REQUEST).json({message:'Invalid entries. Try again.'});
  }
  else if(emailValid=== false){
    return  res.status(BAD_REQUEST).json({message:'Invalid entries. Try again.'});
  }
  else if(!name){
    return   res.status(BAD_REQUEST).json({message:'Invalid entries. Try again.'});
  }
  else if(!password){
    return   res.status(BAD_REQUEST).json({message:'Invalid entries. Try again.'});
  }
  else if(emailExist){
    return   res.status(ERR_409).json({ message:'Email already registered'});
  }
  else{
    next();
  }
};

module.exports ={
  validation
};