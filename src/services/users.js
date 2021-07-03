const UserSchema = require('../schema/users');
const UserModel = require('../models/users');

const create = async (name, email, password, role) => {
  const { error } = UserSchema.validate({name, email, password});
  if(error) throw error;
  const userExists = await UserModel.findByEmail(email);
  if(userExists) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  };
  const _id = await UserModel.create(name, email, password, role);

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
