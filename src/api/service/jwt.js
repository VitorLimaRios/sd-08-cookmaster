const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  const secret = 'superSecret';

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(data, secret, jwtConfig );
  
  return token;
};

module.exports = {
  generateToken
};