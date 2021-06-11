const usersModel = require('../models/users');

const isValid = (name, email, password) => {
  if (!name || !email || !password) 
    return 'Invalid entries. Try again.';

  if (typeof name !== 'string'
    || typeof email !== 'string'
    || typeof password !== 'string')
    return 'Invalid entries. Try again.';

  const regex = /\S+@\S+\.\S+/;
  if (regex.test(email)) 
    return 'Invalid entries. Try again.';

  return false;
};

const alreadyExist = async (email) => {
  const user = await usersModel.getByEmail(email);
  if (user) return 'Email already registered';

  return false;
};

const create = async (name, email, password) => {
  const isUserValid = isValid(name, email, password);
  if (isUserValid) throw new Error(isUserValid);

  const emailAlreadyExists = await alreadyExist(email);
  if (emailAlreadyExists) throw new Error(emailAlreadyExists);

  const { _id, role } = await usersModel.create(name, email, password);

  return {
    _id,
    name,
    quantity,
    role,
  };
};

module.exports = {
  create,
};
