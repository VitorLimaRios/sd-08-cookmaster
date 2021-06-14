const jwt = require('jsonwebtoken');
const { KEY } = require('./consts');

module.exports = (token) => {
  try {
    const decode = jwt.verify(token, KEY);
    const { data } = decode;
    return data;
  } catch (err) {
    return {};
  }
};
