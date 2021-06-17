const LoginSchemas = require('../schemas/LoginSchemas');

const checkUserInBank = async (email, password) => {

  const response = await LoginSchemas.validateEmptyFields(email, password); 

  if(response.code) return response;
    
  const token =  LoginSchemas.createJWT(email, password);

  return token;
};

module.exports = {
  checkUserInBank,
};
