const createDB = require('../../models/create');
const read = require('../../models/read');
const validateEmail = require('../../validate/validateEmail');
const jwt = require('jsonwebtoken');
const secret = 'seusecretdetoken';

// const validateQuantity = require('../../validate/validateQuantity');
// const validateId = require('../../validate/validateId');
// const makeSale = require('./makeSaleCreate');
// const validateSale = require('../../validate/validateSale');
// const readDB = require('../../models/read');
const HTTP_OK_STATUS = 201;
// const ERRO_22 = 422;
const ERRO_00 = 400;
const ERRO_03 = 403;
// const ZERO = 0;
const createSales = async (data, token)=>{
  const {name, email, password} = data;
  let result = {};
  // console.log('Create Sales  ');
  let emailList = await read.listByValue('users', 'email');
  // console.log(data);
  
  if(!name || !password || !email ){
    // console.log('__________________sem nome ou password__________________');
    return {code: ERRO_00, message:{ message:'Invalid entries. Try again.'} };
    // res = res.status(ERRO_00).json(msgError);  
    // next(); 
  }
  
  // console.log('lista de email',emailList ,email);
  result = await validateEmail(email,emailList,{message:'Invalid entries. Try again.'});
  // console.log(result);
  if(!result.isValid){
    return {code: result.code, message: result.message};
  }
  const decoded = jwt.decode(token);
  const resultado = jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      return { code: ERRO_01, message:{message: 'jwt malformed'}};
    }
  });
  if(resultado){
    return resultado;
  }
  const userData = await read.findByValue('users','email',decoded.email);
  console.log(userData[0]);
  if(userData[0].role!=='admin'){
    return {code: ERRO_03, message:{ message:'Only admins can register new admins'} };
  }

  result =  await createDB('users',  {name,email, 'role': 'admin'});
  // console.log('resultado', result[0]);
  // console.log('fechando');
  return {code: HTTP_OK_STATUS, message: {user: result[0] }};
  // res =  res.status(HTTP_OK_STATUS).json({user: result[0]});
  // next();
  
};

module.exports = createSales;