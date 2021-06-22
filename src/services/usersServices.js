const joi = require('joi');
const model = require('../models/usersModel');
const jwt = require('../auth/validateJWT');

const INVALID_ENTRIES = 'Invalid entries. Try again.';
const ALL_FIELDS = 'All fields must be filled';
const INCORRECT = 'Incorrect username or password';
const ONLY_ADMIN = 'Only admins can register new admins';
const BAD = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const CONFLICT = 409;

const addUserSchema = joi.object({
  name: joi
    .string()
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .required(),
});

const create = async (user) => {
  const { error } = addUserSchema.validate(user);
  if (error) {
    return {
      verifyError: true,
      error: { message: INVALID_ENTRIES },
      status: BAD,
    };
  }

  const { email } = user;
  const emailInDB = await model.readByEmail(email);

  if(emailInDB) {
    console.log('******************');
    console.log(emailInDB);
    console.log('******************');
    return {
      verifyError: true,
      error: { message: 'Email already registered' },
      status: CONFLICT,
    };
  }

  const resp = await model.create({ ...user, role: 'user' });
  const { password, ...data } = resp;
  return { user: data };
};

const login = async (user) => {
  const { email, password } = user;
  if (!password || !email) {
    return {
      verifyError: true,
      error: { message: ALL_FIELDS },
      status: UNAUTHORIZED,
    };
  }

  const userInDB = await model.readByEmail(email);
  if (!userInDB || userInDB.password !== password) {
    return {
      verifyError: true,
      error: { message: INCORRECT },
      status: UNAUTHORIZED,
    };
  }

  const data = {
    id: userInDB._id,
    email,
    role: userInDB.role,
  };
  const token = jwt.getToken(data);
  return { token };
};

const createAdmin = async (user, token) => {
  const { error } = addUserSchema.validate(user);
  if (error) {
    return {
      verifyError: true,
      error: { message: INVALID_ENTRIES },
      status: BAD,
    };
  }

  const { email } = user;
  const emailInDB = await model.readByEmail(email);

  if(emailInDB) {
    console.log('******************');
    console.log(emailInDB);
    console.log('******************');
    return {
      verifyError: true,
      error: { message: 'Email already registered' },
      status: CONFLICT,
    };
  }

  const verify = await jwt.verifyToken(token);
  if (!verify) {
    return {
      verifyError: true,
      error: { message: JWT_MALFORMED },
      status: UNAUTHORIZED,
    };
  }

  if (verify.data.role !== 'admin') {
    return {
      verifyError: true,
      error: { message: ONLY_ADMIN },
      status: FORBIDDEN,
    };
  }

  const resp = await model.create({ ...user, role: 'admin' });
  const { password, ...data } = resp;
  return { user: data };
};

module.exports = {
  create,
  login,
  createAdmin,
};
