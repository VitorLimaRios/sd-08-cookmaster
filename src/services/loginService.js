const loginModel = require('../model/loginModel');
const jwt = require('jsonwebtoken');
const validateEmailPassword = require('./loginValidations/validateEmailPassword');
const SECRET = 'harrypotter';

const UNAUTHORIZED_STATUS = 401;

const login = async (email, password) => {
  const validateEntries = validateEmailPassword(email, password);
  if (validateEntries.err) return validateEntries;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const result = await loginModel.getUserByLogin(email, password);
  if (!result)
    return {
      err: {
        status: UNAUTHORIZED_STATUS,
        message: 'Incorrect username or password',
      },
    };
  const { _id: id, email: userEmail, role } = result;
  const user = {
    id,
    userEmail,
    role,
  };
  const token = jwt.sign({ data: user }, SECRET, jwtConfig);
  return { token };
};

module.exports = {
  login,
};
