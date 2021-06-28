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
  // console.log(userData);
  // console.log('----------------------- regra-------------------');
  // console.log(userData[0].role, '?= admin ou ',recipeData.userId, ' ?= ',idOfLogged);
  // console.log(typeof idOfUserRecipe, idOfUserRecipe);
  // console.log(typeof idOfLogged, idOfLogged);
  // console.log(userData[0].role!=='admin' , ' || ', idOfUserRecipe!==idOfLogged);
  // console.log(userData[0].role!=='admin'&& idOfUserRecipe!==idOfLogged);
  if(userData[0].role!=='admin'&& idOfUserRecipe!==idOfLogged){
    return { code: ERRO_01, message: {message: 'missing auth token'}}; 
  }
  // console.log(data);
  // const {name , ingredients, preparation} = data;
  // console.log(quantity);
  // let result = {};
  // if(!result.isValid) { res = result ; next();}
  // saleDetalils = await read.findByValue('recepis',);
  // console.log('BUSCANDO A COMPRA A SER ALTERADA');
  // console.log(saleDetalils.itensSold);
  // const iqualId = (a)=>{
  //   if(a.productId === productId){
  //     return a;
  //   }
  // };
  // const index = saleDetalils.itensSold.findIndex(iqualId);
  // https://www.w3schools.com/jsref/jsref_findindex.asp#:~:text=The%20findIndex()%20method%20executes,Otherwise%20it%20returns%20-1
  // console.log(index);
  // console.log(saleDetalils.itensSold[index]);
  // saleDetalils.itensSold[index].quantity = quantity;


  // const storage = multer.diskStorage({
  //   destination: (req, file, callback) => callback(null, 'uploads/'),
  //   filename: (req, file, callback) => {
  //     split = file.originalname.split('.');
  //     callback(null, `1024.${split[1]}`);
  //   }
  // });
  
  // const upload = multer({ storage });
  // upload.ge;
  // upload.single(`${id}.jpeg`);
  const result =  await updateDB(id ,'recipes',
    {image: `localhost:3000/uploads/${id}.jpeg`,
      userId: userData[0]._id , ...recipeData});
  // console.log(result);
  // console.log('upload', upload);
  return {code: HTTP_OK_STATUS, message: result};
  // res.status(HTTP_OK_STATUS).json(result);
};
module.exports = updateImage;