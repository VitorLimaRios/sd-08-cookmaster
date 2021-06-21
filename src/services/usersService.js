const { getUser, createUser } = require('../models/usersModel');

const CONFLICT = 409;
const CREATED = 201;

const createUserService = async(user) => {
  const { email } = user;
  const userExists = await getUser(email);
  if (userExists) return { status: CONFLICT, message: 'Email already registered' };
  const { password, ...register } = await createUser({ ...user, role: 'user' });
  return { status: CREATED, user: register };
};

module.exports = {
  createUserService,
};