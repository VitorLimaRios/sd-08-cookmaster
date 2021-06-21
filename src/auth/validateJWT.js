const jwt = require('jsonwebtoken');
const secret = 'thebestgamedevintrybe';

const opt = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const getToken = (data) => jwt.sign({ data }, secret, opt);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  getToken,
  verifyToken,
};
