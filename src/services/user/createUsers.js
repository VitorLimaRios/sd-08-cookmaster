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
const ERRO_09 = 409;
const ZERO = 0;
const createSales = async (data, res , next)=>{
  const {name, email, password} = data;
  let result = {};
  const msgError = { message: 'Invalid entries. Try again.' };
  console.log('Create Sales  ');
  let emailList = await read.listByValue('users', 'email');
  console.log(data);
  
  if(!name || !password || !email ){
    console.log('__________________sem nome ou password__________________');
    res = res.status(ERRO_04).json(msgError);  
    next(); 
  }
  if(res.statusCode!==ERRO_04){
    console.log('lista de email',emailList ,email);
    validateEmail(email,emailList,res, msgError);
  }
  if(res.statusCode!==ERRO_04 && res.statusCode!==ERRO_09){
    result =  await createDB('users',  {name,email, 'role': 'user'});
    res =  res.status(HTTP_OK_STATUS).json({user: result[0]});
    console.log('resultado', result[0]);
    console.log('fechando');
    next();
  }
};

module.exports = createSales;