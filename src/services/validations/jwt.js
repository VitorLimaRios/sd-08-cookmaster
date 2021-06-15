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

module.exports = createToken;
