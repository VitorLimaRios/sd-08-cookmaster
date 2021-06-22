const read = require('../../models/read');
const validateId = require('../../validate/validateId');
const HTTP_OK_STATUS = 200;
const ERROR_04=404;
const readProductsById = async (id, res, next) => {
  let result = {};
  console.log(id);
  console.log(typeof id);
  result = await validateId(id, res);
  if(result === {} ) { res = result ; next();}
  result = await read.findById('recipes', id);
  res.status(HTTP_OK_STATUS).json(result);
  next();
};
module.exports = readProductsById;