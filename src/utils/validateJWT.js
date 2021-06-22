const jwt = require('jsonwebtoken');

JWT_SECRET = 'At the end of Game of Thrones John Snow kills Daenerys Targaryen';

const tokenEncrypt = (data) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: '1d',
  });
};

const tokenDecrypt = (token) => {
  if (!token) return false;
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  tokenEncrypt,
  tokenDecrypt,
};