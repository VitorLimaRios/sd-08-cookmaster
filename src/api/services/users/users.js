const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = 'tokenSecret';

const {
  getAllModel,
  addModel,
} = require('../../models/users/users');

const {
  valid,
  validEmail,
  validLogin,
  validPassword,
} = require('../../validations');

const getAllServices = async () => {
  const result = await getAllModel();
  return result;
};

const addServices = async (users) => {
  const { error } = valid.validate(users);
  if (error) return { status: 400, message: error.details[0].message };
  const onlyEmail = await validEmail(users.email);
  if (onlyEmail) return { status: 409, message: 'Email already registered' };
  const result = await addModel(users);
  return result;
};

const generateToken = async (user) => {
  const { error } = validLogin.validate(user);
  if (error) return { status: 401, message: error.details[0].message };
  const findEmail = await validEmail(user.email);
  if (findEmail === null) {
    return { status: 401, message: 'Incorrect username or password' };
  };
  const findPassword = await validPassword(user.password);
  let bool = true;
  if (!findEmail || !findPassword) bool = false;
  const payload = {
    email: user.email,
    role: bool,
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = {
  getAllServices,
  addServices,
  generateToken,
};
