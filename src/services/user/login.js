const ERRO_01 = 401;
const STATUS_OK = 200;
const MINIMAL_PASS_LENGTH =7;
const jwt = require('jsonwebtoken');
const secret = 'seusecretdetoken';
const login = (data)=>{
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z0-9-]+)*$/;
  const {email , password} = data;
  console.log(email, password);
  if(!email || !password){
    // console.log('###### EXISTENCIA EMAIL E PASSWORD :   ', email, password );
    return {code: ERRO_01, message:'All fields must be filled' };
    // res = res.status(ERRO_01).json({message:'All fields must be filled'}); 
    // next();
  }  else if( !re.test(email) ||  password.length < MINIMAL_PASS_LENGTH ){
    // console.log('###### VALIDAÇÂO DE EMAIL :   ',re.test(email) ,password);
    return {code: ERRO_01, message:'Incorrect username or password' };
    // res = res.status(ERRO_01).json({message:'Incorrect username or password'});  
    // next();
  } 
  
  // console.log('###### Criando token :   ', email, password );
  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return {code: STATUS_OK, message:{ token } };
  // res = res.status(STATUS_OK).json({ token });
  // next();
  
};
module.exports = login;