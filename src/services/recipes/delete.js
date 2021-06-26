const deleteDB = require('../../models/delete');
const jwt = require('jsonwebtoken');
const secret = 'seusecretdetoken';
const HTTP_OK_STATUS = 204;
const ERRO_01 = 401;

const deleteProduct = async ( id, token )=>{
  if(!token){
    return { code: ERRO_01,message: {message: 'missing auth token'}}; 
  };
  const decoded = jwt.decode(token);
  const resultado = jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      return { code: ERRO_01, message:{message: 'jwt malformed'}};
    }
  });
  if(resultado){
    return resultado;
  }
  const result =  await deleteDB(id ,'recipes');
  return {code: HTTP_OK_STATUS, message: ''};
};

module.exports = deleteProduct;