const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const secret = 'placeholder';
const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, secret);
    const user = await userModel.getUserByEmail(decodedToken.data.email);
    req.userId = user._id;
    
    next();
  } catch (_err) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};
