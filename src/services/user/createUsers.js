const createDB = require('../../models/create');
const read = require('../../models/read');
const validateEmail = require('../../validate/validateEmail');

// const validateQuantity = require('../../validate/validateQuantity');
// const validateId = require('../../validate/validateId');
// const makeSale = require('./makeSaleCreate');
// const validateSale = require('../../validate/validateSale');
// const readDB = require('../../models/read');
const HTTP_OK_STATUS = 201;
// const ERRO_22 = 422;
const ERRO_04 = 400;
// const ERRO_09 = 409;
// const ZERO = 0;
const createSales = async (data)=>{
  const {name, email, password} = data;
  let result = {};
  // console.log('Create Sales  ');
  let emailList = await read.listByValue('users', 'email');
  // console.log(data);
  
  if(!name || !password || !email ){
    // console.log('__________________sem nome ou password__________________');
    return {code: ERRO_04, message:'Invalid entries. Try again.' };
    // res = res.status(ERRO_04).json(msgError);  
    // next(); 
  }
  
  // console.log('lista de email',emailList ,email);
  result = await validateEmail(email,emailList,'Invalid entries. Try again.');
  // console.log(result);
  if(!result.isValid){
    return {code: result.code, message: result.message};
  }
  
  result =  await createDB('users',  {name,email, 'role': 'user'});
  // console.log('resultado', result[0]);
  // console.log('fechando');
  return {code: HTTP_OK_STATUS, message:  result[0] };
  // res =  res.status(HTTP_OK_STATUS).json({user: result[0]});
  // next();
  
};

module.exports = createSales;