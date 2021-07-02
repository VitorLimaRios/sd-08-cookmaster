const read = require('../../models/read');
const validateId = require('../../validate/validateId');
const HTTP_OK_STATUS = 200;
const ERROR_04=404;
const readProductsById = async (id) => {
  let result = {};
  result = await validateId(id,  'recipe not found', ERROR_04);
  if(!result.isValid) {
    return{code: result.code, message: {message: result.message}};
  }
  result = await read.findById('recipes', id);
  return { code: HTTP_OK_STATUS, message: result.image};
};
module.exports = readProductsById;