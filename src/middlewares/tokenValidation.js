const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const tokenValidation = async (req, res, next) => {
  const error_token = 401;
  const secret = 'onepiece';
  try {
    if (!req.headers.authorization) {
      return res.status(error_token).json({ message: 'missing auth token' });
    }
    const token = req.headers.authorization;
    const token_crip = jwt.verify(token, secret);
    const user = await userModel.getUser(token_crip.data.email);
    if (!user) {
      return res.status(error_token).json({ message: 'jwt malformed' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(error_token).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  tokenValidation
};
