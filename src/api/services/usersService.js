const usersModel = require('../models/usersModel');
const usersSchema = require('../schema/usersSchema');

const createUser = async (data) => {
  const bodyValidation = await usersSchema.validateUserCreation(data);
  if (bodyValidation) return bodyValidation;

  const { ops } = await usersModel.insertOneUser({ ...data, role: 'user' });
  const { password, ...user } = ops[0];
  return { code: 201, response: { user } };
};

module.exports = {
  createUser,
};
