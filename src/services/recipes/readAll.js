const read = require('../../models/read');
const HTTP_OK_STATUS = 200;
const readById = async () => {
  let result = {};
  console.log('leitura');
  result = await read.getAll('recipes');
  console.log(result);
  return { code: HTTP_OK_STATUS, message: result};
  // res.status(HTTP_OK_STATUS).json( result);
  // next();
};
module.exports = readById;