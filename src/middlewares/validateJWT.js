const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const { code, message } = require('../helpers/messages');

const secret = 'seusecretdetoken';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new Error({ message:'missing auth token' });
    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findUserByEmail(decoded.email);
    if (!user) return res.status(code.UNAUTHORIZED).json(
      { message: 'jwt malformed' }
    );
    req.user = user;
    next();
  } catch (error) {
    return res.status(code.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
