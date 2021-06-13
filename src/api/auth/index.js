const jwt = require('jsonwebtoken');

const secret = 'olokobicho';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function returnToken(email, password){
  const token = jwt.sign({email, password}, secret, jwtConfig);
  return token;
}

module.exports = {
  returnToken
};

