const Users = require('../models/Users');
const userValidator= require('../utils/userValidator');

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

module.exports = {
  newUser
};