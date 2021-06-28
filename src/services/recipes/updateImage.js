const updateDB = require('../../models/update');
const readDB = require('../../models/read');
const jwt = require('jsonwebtoken');
// var multer  = require('multer');
const secret = 'seusecretdetoken';
const HTTP_OK_STATUS = 200;
const ERRO_01 = 401;
const updateImage = async ( id, data, token)=>{
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
  const recipeData = await readDB.findById('recipes',id);
  const idOfUserRecipe =  recipeData.userId.toString();
  const idOfLogged =  userData[0]._id.toString();
  if(userData[0].role!=='admin'&& idOfUserRecipe!==idOfLogged){
    return { code: ERRO_01, message: {message: 'missing auth token'}}; 
  }
  const result =  await updateDB(id ,'recipes',
    {image: `localhost:3000/src/uploads/${id}.jpeg`,
      userId: userData[0]._id , ...recipeData});
  return {code: HTTP_OK_STATUS, message: result};
};
module.exports = updateImage;