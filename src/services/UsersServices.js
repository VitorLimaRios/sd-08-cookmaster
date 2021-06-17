const UsersModel = require('../models/UsersModel');
const UsersSchemas = require('../schemas/UsersSchemas');

const registerUsers = async ({name, email, password}) => {

  const validation = await UsersSchemas.inputValidation({name, email, password});
  if(validation.code) return validation;


  const newUserDB = UsersSchemas.addNewKeyRole({ name, email, password });
  const userDb = await UsersModel.registerUsers(newUserDB);
  const NewObjectUser = UsersSchemas.newReturnObject(userDb);

  return NewObjectUser; 
};

module.exports = {
  registerUsers,
};
