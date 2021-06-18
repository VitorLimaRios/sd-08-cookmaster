const jwt = require('jsonwebtoken');
const secret = 'senha123';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGenerateForLogin = async (email, password) => {
  const userData = { email, password };
  const token = jwt.sign({ data: userData.email }, secret, jwtConfig);
  return ({ token });
};

const tokenDecodation = async (toDecode) => {
  const decodationData = jwt.verify(toDecode, secret, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });
  return (decodationData);
};

module.exports = { tokenGenerateForLogin, tokenDecodation };
