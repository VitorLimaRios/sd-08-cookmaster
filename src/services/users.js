const valid = require('../validation/user');
const user = require('../models/user');

const create = async (name, email, password, role) => {
  const { error } = valid.validate({name, email, password});
  if(error) throw error;
  const userExists = await user.find(email);
  if(userExists) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  };
  const _id = await user.create(name, email, password, role);

  return {
    user: {
      name,
      email,
      role,
      _id
    }
  };
};

module.exports = {
  create
};
