const User = require('../models/User');
const JWT = require('jsonwebtoken');
const SECRET = 'meusegredosuperseguro';
const msg = require('../validators/ErrorMessages');
const { validationResult } = require('express-validator');

module.exports = {
  verifyEntries: (entries) => {
    const result = validationResult(entries);
    if (!result.isEmpty()) {
      return result.errors[0].msg;
    } else {
      return false;
    }
  },
  verifyUnicity: async (email) => {
    const user = await User.findUserByEmail(email);
    if (user) {
      return { code: msg.status.conflict, message: msg.notUnique };
    } else return false;
  },
  verifyLoginData: async (email, password) => {
    const user = await User.findUserByEmail(email);
    if (!user || user.email !== email || user.password !== password) {
      return { code: msg.status.unauthorized, message: msg.loginInvalid };
    } else return false;
  },
  generateToken: async (user) => {
    const JWTConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = JWT.sign({ data: user }, SECRET, JWTConfig);
    return { code: msg.status.ok, token };
  },
  verifyToken: async (token) => {
    if (!token) {
      return { code: msg.status.unauthorized, message: msg.errorJWT };
    }
    try {
      const decoded = JWT.verify(token, SECRET);
      return decoded.data;
    } catch (err) {
      return { code: msg.status.unauthorized, message: msg.errorJWT };
    }
  },
  addUser: async (entries) => {
    const { _id, name, email, role } = await User.save(entries);
    return {
      _id,
      name,
      email,
      role,
    };
  },
};
