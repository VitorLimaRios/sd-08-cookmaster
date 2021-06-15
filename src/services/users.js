const usersModel = require('../models/users');
const jwt = require('jsonwebtoken');

const secret = 'cookmastersecret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const isValid = (name, email, password) => {
  if (!name || !email || !password) 
    return 'Invalid entries. Try again.';

  if (typeof name !== 'string'
    || typeof email !== 'string'
    || typeof password !== 'string')
    return 'Entries must be string.';

  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) 
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
    email,
    role,
  };
};

const isLoginValid = (email, password) => {
  if (!email || !password) 
    return 'All fields must be filled';

  if (typeof email !== 'string' || typeof password !== 'string')
    return 'Entries must be string.';

  return false;
};

const emailOrPasswordInvalid = async (user, password) => {
  if (!user || user.password !== password)
    return 'Incorrect username or password';
  
  return false;
};

const login = async (email, password) => {
  const isValid = isLoginValid(email, password);
  if (isValid) throw new Error(isValid);
  
  const user = await usersModel.getByEmail(email);
  // console.log(user);
  const emailAndPassword = await emailOrPasswordInvalid(user, password);
  if (emailAndPassword) throw new Error(emailAndPassword);

  const { password: ignore, ...otherInfo } = user;

  const token = jwt.sign({ data: otherInfo }, secret, jwtConfig);

  return token;
};

module.exports = {
  create,
  login,
};
