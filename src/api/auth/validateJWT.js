const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'seusecretdetoken';
const httpStatusCodeBadRequest = 400;
const httpStatusCodeUnauthorized = 401;

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(httpStatusCodeBadRequest).json({ message: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.buscarUsuarioPorEmail(decoded.email);

    if (!user) return res.status(httpStatusCodeUnauthorized).json(
      { message: 'Invalid token' }
    );
    req.user = user;
    next();
  } catch (err) {
    return res.status(httpStatusCodeUnauthorized).json({ message: err.message });
  }
};

module.exports = { validateJWT };