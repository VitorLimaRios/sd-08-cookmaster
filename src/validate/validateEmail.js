const ERRO_00 = 400;
const ERRO_09 = 409;
const MENUS_ONE =-1;
const  validateEmail = async (email,emailList, msgError) => {
  const index = emailList.indexOf(email);
  const re = /\S+@\S+\.\S+/;
  if( !re.test(email)){
    // console.log('###### VALIDAÇÂO DE EMAIL :   ',re.test(email));
    return {code: ERRO_00, message: msgError, isValid: false };
    // res = res.status(ERRO_00).json(msgError);  
  }else if(index !== MENUS_ONE ){
    // console.log('###### EMAIL NA LISTA     :   ',index === MENUS_ONE);
    return {code: ERRO_09, message:{message:'Email already registered'}, isValid: false };
    // res = res.status(ERRO_09).json({message:'Email already registered'});  
  };
  return {isValid: true };
};
module.exports = validateEmail;