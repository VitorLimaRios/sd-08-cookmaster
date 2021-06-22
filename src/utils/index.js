const jwt = require('jsonwebtoken');
const SECRET_KEY = require('./secret');

const isValidEmail = (email) => (
  /^[^\s@]+@[^\s@]+$/.test(email)
);

const validateToken = (token) => {
  try {
    const { user } = jwt.verify(token, SECRET_KEY);
    if (!user) return { ok: false };
    return { ok: true, user };
  } catch {
    return { ok: false };
  }
};

module.exports = {
  isValidEmail,
  validateToken,
};