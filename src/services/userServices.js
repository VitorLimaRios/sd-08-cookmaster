const { BAD_REQUEST, CONFLICT } = require('../api/constants/statusCodes');
const { ALREADY_REGISTERED } = require('../api/constants/statusMessages');
const { addUser, getUserbyEmail } = require('../models/userModel');
const { generateError } = require('./errors/generateError');
const joiValidation = require('./validations/joiValidation');

const addsUser = async(name, email, password) => {
  const { error } = joiValidation.validate({name, email, password});
  if (error){ 
    const errorMessage = error.details[0].message;
    return generateError(errorMessage, BAD_REQUEST);
  };
  const alreadyExists = await getUserbyEmail(email);
  if(alreadyExists) return generateError(ALREADY_REGISTERED, CONFLICT);

  const addedUser = await addUser(name, email);
  return addedUser.ops[0];

};


module.exports = {
  addsUser,
};
