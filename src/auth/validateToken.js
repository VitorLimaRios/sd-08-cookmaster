const jwt = require('jsonwebtoken');

const secret = 'Klift, Kloft, Still! A porta se abriu!';

module.exports = (token) => jwt.verify(token, secret);
