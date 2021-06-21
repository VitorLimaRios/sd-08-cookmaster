const jwt = require('jsonwebtoken');
const userModel = require('../../models/users');

const secret = 'mypass';
const errorToken = 'jwt malformed';

const UNAUTHORIZED = 401;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findEmail(decoded.data.email);    
    
    if (!user) return res.status(UNAUTHORIZED).json({ 'message': 'jwt malformed' });

    req.userId = user._id;
    req.role = user.role;
  
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: errorToken });
  }
};

module.exports = validateJWT;

