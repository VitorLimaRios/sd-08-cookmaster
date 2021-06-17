const Users = require('../models/Users');

const create = async (user) => {
  const { email } = user;
  
  const emailExists = await Users.findByEmail(email);
  
  if (emailExists) {
    return {
      error: {
        code: 409,
        message: 'Email already registered'
      }
    };
  }
  
  return Users.create(user);
};

module.exports = {
  create,
};