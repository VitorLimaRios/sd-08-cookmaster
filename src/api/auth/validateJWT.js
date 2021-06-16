const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'seusecretdetoken';
const httpStatusCodeUnauthorized = 401;

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(httpStatusCodeUnauthorized).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.buscarUsuarioPorEmail(decoded.email);

    if (!user) return res.status(httpStatusCodeUnauthorized).json(
      { message: 'jwt malformed' }
    );
    req.user = user;
    next();
  } catch (err) {
    return res.status(httpStatusCodeUnauthorized).json({  message: 'jwt malformed' });
  }
};

module.exports = { validateJWT };