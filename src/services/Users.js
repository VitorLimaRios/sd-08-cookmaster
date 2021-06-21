const jwt = require('jsonwebtoken');

const model = require('../models/Users');
const { userSchema } = require('./validation');

const HTTP = require('../utils/httpStatusCodes');
const generateError = require('../utils/generateError');

const { SECRET } = require('../utils/doNotLook');
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createUser = async (user) => {
  try {
    if (userSchema.validate(user).error) {
      throw generateError(HTTP.BAD_REQUEST, 'Invalid entries. Try again.');
    }

    const isEmailUnique = await model.isEmailRegistered(user.email);
    if (isEmailUnique) {
      throw generateError(HTTP.CONFLICT, 'Email already registered');
    }

    return {
      status: HTTP.CREATED,
      result: await model.createUser(user),
    };
  } catch (err) {
    return err;
  }
};

const login = async (loginData) => {
  try {
    const { email, password } = loginData;
    if (!email || !password) {
      throw generateError(HTTP.UNAUTHORIZED, 'All fields must be filled');
    }

    const result = await model.login(loginData);
    if (!result) {
      throw generateError(HTTP.UNAUTHORIZED, 'Incorrect username or password');
    }

    delete result.password;

    const token = jwt.sign({ user: result }, SECRET, jwtConfig);

    return {
      status: HTTP.OK,
      result: { token },
    };
  } catch (err) {
    return err;
  }
};

module.exports = { createUser, login };
