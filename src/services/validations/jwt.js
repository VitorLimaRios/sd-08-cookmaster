const jwt = require('jsonwebtoken');

const secret = 'project-cookmaster';

const jwtConfig = {
  expiresIn: '15min',
  algorithm: 'HS256'
};


const createToken = (data) => {
  const token = jwt.sign({data}, secret, jwtConfig);
  return token;
};

const validateToken = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

module.exports = { createToken, validateToken };
