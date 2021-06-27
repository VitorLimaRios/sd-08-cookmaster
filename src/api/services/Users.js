const Users = require('../models/Users');
const userValidator= require('../utils/userValidator');
const loginValidator= require('../utils/loginValidator');

const newUser = async (user) => {
  const userValidation = await userValidator(user);
  if (userValidation.error) return userValidation;
  const { insertedId } = await Users.newUser(user);
  return {
    user: {
      ...userValidation,
      _id: insertedId
    }
  };
};

const login = async (loginData) => {
  const userFromDB = await Users.findUser(loginData.email);
  if (!userFromDB) return {
    
  };
};

module.exports = {
  newUser
};