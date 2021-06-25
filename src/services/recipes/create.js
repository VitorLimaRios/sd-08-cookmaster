const createDB = require('../../models/create');
const read = require('../../models/read');
const HTTP_OK_STATUS = 201;
const ERRO_00 = 400;
const ERRO_01 = 401;
// const ZERO= 0;
const jwt = require('jsonwebtoken');
const secret = 'seusecretdetoken';

const create = async (data, token )=>{
  const {name,ingredients,preparation} = data;
  let result = {};
  let userData = [];
  if(!name|| !ingredients||!preparation){
    // console.log(name, ingredients, preparation);
    return { code: ERRO_00, message: 'Invalid entries. Try again.'};
  }
  const decoded = jwt.decode(token);
  console.log(token);
  const resultado = jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      console.log('errooouuuuuuu!  ------------------------');
      return { code: ERRO_01, message: 'jwt malformed'};
    }
  });
  if(resultado){
    console.log(resultado);
    return resultado;
  }
  // const decoded = jwt.verify(token, secret);
  // if(decoded){
  //   return { code: ERRO_01, message: 'jwt malformed'};
  // }
  
  
 
  try {
    userData = await read.findByValue('users','email',decoded.email);
  } catch(err){
    return { code: ERRO_00, message: 'Invalid entries. Try again.'};
  }
  // console.log(decoded);
  const {_id}=  userData[0];
  // console.table(userData);
  // console.log( 'datauser',decoded.email, idAutor);
  result =  await createDB('recipes', 
    { name,
      ingredients, 
      preparation, 
      userId: _id}
  );
  return { code: HTTP_OK_STATUS, message: result[0]};
};

module.exports = create;