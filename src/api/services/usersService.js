const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const usersSchema = require('../schema/usersSchema');

const statusCode = {
  ok: 200,
  created: 201,
};

const createUser = async (data) => {
  const bodyValidation = await usersSchema.validateUserCreation(data);
  if (bodyValidation) return bodyValidation;

  const { ops } = await usersModel.insertOneUser({ ...data, role: 'user' });
  const { password, ...user } = ops[0];
  return { code: statusCode.created, response: { user } };
};

const findUserByEmail = (email) => {
  return usersModel.findUserByEmail(email);
};

const generateToken = async (data) => {
  const bodyValidation = await usersSchema.validateTokenGeneration(data);
  if (bodyValidation) return bodyValidation;
  
  const { email } = data;
  const { _id, role } = await usersModel.findUserByEmail(email);

  const SECRET_KEY = 'SEGREDO';
  const payload = { _id, email, role };
  const token = jwt.sign(payload, SECRET_KEY);

  return { code: statusCode.ok, response: { token }};
};

module.exports = {
  createUser,
  findUserByEmail,
  generateToken,
};
