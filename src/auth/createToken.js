const jwt = require('jsonwebtoken');

const secret = 'Klift, Kloft, Still! A porta se abriu!';

const headers = {
  algorithm: 'HS256',
  expiresIn: '7d'
};

module.exports = (payload) => jwt.sign(payload, secret, headers);
