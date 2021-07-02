const updateDB = require('../../models/update');
const readDB = require('../../models/read');
const jwt = require('jsonwebtoken');
const secret = 'seusecretdetoken';
const HTTP_OK_STATUS = 200;
const ERRO_01 = 401;
const update = async ( id, data, token)=>{
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
  const userData = await readDB.findByValue('users','email',decoded.email);
  const result =  await updateDB(id ,'recipes', data);
  console.log(userData[0]._id);
  return {code: HTTP_OK_STATUS, message: {userId: userData[0]._id, ...result}};
};
module.exports = update;