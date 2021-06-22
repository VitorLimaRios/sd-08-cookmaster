const userModels = require('../models/userModels');

const jwt = require('jsonwebtoken');
const secret = 'trybe-t8';
const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256'
};

const login = async (mail, pass) => {
  const byEmail = await userModels.getByEmail(mail);

  // ser for undefined e verdadeiro
  // if ([!pass, !mail].includes(true)) {
  if (!pass || !mail) {
    return undefined;
  }

  // ser não for null 
  if (byEmail !== null) {

    const { password, email } = byEmail;

    if (password === pass) {
      const token = jwt.sign({ data: email }, secret, jwtConfig);
      return token;
    }
  }

  if (byEmail === null) {
    return 'null';
  }
};

module.exports = {
  login,
};