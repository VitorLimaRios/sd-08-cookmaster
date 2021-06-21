const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secret = 'issoesegredo';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const add = async (name, email, password) => {
  const findEmailUser = await userModel.getByEmail(email);
  if ([!name, !email, !password].includes(true)) {
    return undefined;
  }
  const validEmail = () =>
    /^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/.test(
      email
    );
  if (!validEmail()) {
    return undefined;
  }
  if (findEmailUser) {
    return null;
  }
  const addedUser = await userModel.add(name, email, password);
  return addedUser;
};

const login = async (mail, pass) => {
  const findEmailUser = await userModel.getByEmail(mail);
  if ([!mail, !pass].includes(true)) {
    return undefined;
  }

  if (findEmailUser !== null) {
    const { email, password } = findEmailUser;
    if (password === pass) {
      const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);
      return token;
    }
  } else {
    return 'not';
  }

};

module.exports = {
  add,
  login,
};
