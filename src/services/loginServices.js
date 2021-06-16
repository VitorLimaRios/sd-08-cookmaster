const { UNAUTHORIZED } = require('../api/constants/statusCodes');
const { INCORRECT_USER_OR_PASS } = require('../api/constants/statusMessages');
const { generateError } = require('./errors/generateError');
const loginValidation = require('./validations/loginValidation');
const jwt = require('jsonwebtoken');
const { createToken } = require('./validations/jwt');
const { getUserbyEmail } = require('../models/userModel');


// I built my ownn RegEx at regex101.com
const emailRegExp = /[a-z]\w+@\D+.\w+/;

const userLogin = async(email, password) => {

  const { error } = loginValidation.validate({email, password});
  if (error){ 
    const errorMessage = error.details[0].message;
    return generateError(errorMessage, UNAUTHORIZED);
  };

  if(!email.match(emailRegExp)) {
    return generateError(INCORRECT_USER_OR_PASS, UNAUTHORIZED);
  }
  const userInDB = await getUserbyEmail(email);

  try {
    const userId = userInDB['_id'];
  
    const token = createToken({email, userId});
    return token;
    
  } catch (_error) {
    return generateError(INCORRECT_USER_OR_PASS, UNAUTHORIZED);
  }

};

module.exports = {
  userLogin,
};
