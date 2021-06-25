const read = require('../../models/read');
const validateId = require('../../validate/validateId');
const HTTP_OK_STATUS = 200;
const ERROR_04=404;
const readProductsById = async (id) => {
  let result = {};
  // console.log(id);
  // console.log(typeof id);
  result = await validateId(id,  'recipe not found', ERROR_04);
  // console.log(result);
  if(!result.isValid) { 
    console.log('saiaaa') ; 
    return{code: result.code, message: {message: result.message}};
  }
  // if(res.statusCode!==ERROR_04)
  result = await read.findById('recipes', id);
  return { code: HTTP_OK_STATUS, message: result};
  // res.status(HTTP_OK_STATUS).json(result);
  // next();
};
module.exports = readProductsById;