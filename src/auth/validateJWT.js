const jwt = require('jsonwebtoken');
const secret = 'thebestgamedevintrybe';

const opt = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const getToken = (data) => jwt.sign({ data }, secret, opt);

const verifyToken = async(token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  getToken,
  verifyToken,
};
