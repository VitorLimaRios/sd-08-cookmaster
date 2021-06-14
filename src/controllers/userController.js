const jwt = require('jsonwebtoken');

const userService = require('../services/userService');

const secret = 'placeholder';

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const CONFLICT = 409;

const createUser = async (req, res, next) => {
  const newUser = await userService.createUser(req.body);

  if (newUser.bad_request) {
    return next({ status: BAD_REQUEST, message: 'Invalid entries. Try again.' });
  }

  if (newUser.conflict) {
    return next({ status: CONFLICT, message: 'Email already registered' });
  }

  res.status(CREATED).json(newUser);
};

const userLogin = async (req, res, next) => {
  const user = await userService.userLogin(req.body);

  if (user.missing_fields) {
    return next({ status: UNAUTHORIZED, message: 'All fields must be filled' });
  }

  if (user.incorrect_fields) {
    return next({ status: UNAUTHORIZED, message: 'Incorrect username or password' });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256'
  };

  const { _id, email, role } = user;
  const token = jwt.sign({ data: { _id, email, role } }, secret, jwtConfig);

  res.status(OK).json({ token });
};

module.exports = { createUser, userLogin };
