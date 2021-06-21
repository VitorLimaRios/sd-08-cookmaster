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

// {
//   data: {
//   _id: '5e54590ba49448f7e5fa73c0',
//   username: 'italssodj',
//   password: 'senha123'
//   },
//   iat: 1582587327,
//   exp: 1584774714908
// }

module.exports = {
  tokenEncrypt,
  tokenDecrypt,
};