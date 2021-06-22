const createDB = require('../../models/create');
const read = require('../../models/read');
const HTTP_OK_STATUS = 201;
const ERRO_00 = 400;
const ERRO_01 = 401;
const jwt = require('jsonwebtoken');
const secret = 'seusecretdetoken';

const create = async (data, res,token , next)=>{
  const {name,ingredients,preparation} = data;
  let result = {};
  let decoded = {};
  let userData = [];
  if(!name|| !ingredients||!preparation){
    res = res.status(ERRO_00).json({message: 'Invalid entries. Try again.'});
    next();
  }
  if( res.statusCode!==ERRO_00){
    
    try {
      decoded = jwt.verify(token, secret);
    } catch(err){
      res = res.status(ERRO_01).json({message: 'jwt malformed'});
      next();
    }
  }
  // console.table(decoded);
  if ( res.statusCode!==ERRO_00){
    try {
      userData = await read.findByValue('users','email',decoded.email);
    } catch(err){
      res = res.status(ERRO_00).json({message: 'Invalid entries. Try again.'});
      next();
    }
  } 
  if( res.statusCode!==ERRO_00 && !userData[0]) {
    const {_id}=  userData[0];
    // console.table(userData);
    // console.log( 'datauser',decoded.email, idAutor);
    result =  await createDB('recipes', 
      { name,
        ingredients, 
        preparation, 
        userId: _id}
    );
    res = res.status(HTTP_OK_STATUS).json({recipe: result[0]});
    // console.log(result);
    next();
  }
};

module.exports = create;