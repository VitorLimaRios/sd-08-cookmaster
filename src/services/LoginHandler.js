const Login = require('../models/Login');
const { isValidEmail } = require('../utils');

const LoginHandler = async ({email, password}) => {
  if (!email || !password) {
    return {status: 401, message: 'All fields must be filled'};
  }
  if (!isValidEmail(email)) {
    return {status: 401, message: 'Incorrect username or password'};
  }
  const token = await Login({email, password});

  if (!token) {
    return {status: 401, message: 'Incorrect username or password'};
  }
  return {status: 200, token};
};

module.exports = LoginHandler;