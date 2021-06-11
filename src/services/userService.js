const userModel = require('../models/userModel');

const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;
// https://ui.dev/validate-email-address-javascript/
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password || !validEmail.test(email))
    return { code: BAD_REQUEST, message: { message: 'Invalid entries. Try again.' } };

  const existanteUser = await userModel.findUser(email);

  if (existanteUser)
    return { code: CONFLICT, message: { message: 'Email already registered' } };
  
  const result = await userModel.createUser({ name, email, password });

  if (result.error)
    return { code: INTERNAL_SERVER_ERROR, message: { message: result.error } };

  const user = {
    name: result.name,
    email: result.email,
    role: result.role,
    _id: result._id,
  };
  
  return { code: CREATED, message: { user } };
};

module.exports = {
  createUser,
};
