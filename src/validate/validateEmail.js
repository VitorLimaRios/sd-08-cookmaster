const ERRO_00 = 400;
const ERRO_09 = 409;
const MENUS_ONE =-1;
const  validateEmail = async (email,emailList,res, msgError) => {
  const index = emailList.indexOf(email);
  const re = /\S+@\S+\.\S+/;
  if( !re.test(email)){
    console.log('###### VALIDAÇÂO DE EMAIL :   ',re.test(email));
    res = res.status(ERRO_00).json(msgError);  
  }else if(index !== MENUS_ONE ){
    console.log('###### EMAIL NA LISTA     :   ',index === MENUS_ONE);
    res = res.status(ERRO_09).json({message:'Email already registered'});  
  };
};
module.exports = validateEmail;