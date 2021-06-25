const ERRO_INVALID_DATA = 422;
const doze =23;
const {ObjectId} = require('mongodb');
const  validateId = (id, msgError, erroCode) => {
  msgError = msgError ||   'Wrong id format' ;
  erroCode = erroCode || ERRO_INVALID_DATA;
  // console.log('1 valida ID '+id);
  // console.log(ObjectId.isValid(id));
  if(id.lenght<doze){
    return {code: erroCode, message: msgError, isValid: false };
  }
  try {   
    if (!ObjectId.isValid(id)) {
      return {code: erroCode, message: msgError, isValid: false };
    };
  } catch (error) {
    console.log(error);
  }
  return {isValid: true};
};

module.exports = validateId;