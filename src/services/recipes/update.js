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
  // if(decoded.role!=='admin'){
  //   return { code: ERRO_01, message: {message: 'missing auth token'}}; 
  // }
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
  const result =  await updateDB(id ,'recipes', data);
  console.log(userData[0]._id);
  return {code: HTTP_OK_STATUS, message: {userId: userData[0]._id, ...result}};
  // res.status(HTTP_OK_STATUS).json(result);
};
module.exports = update;