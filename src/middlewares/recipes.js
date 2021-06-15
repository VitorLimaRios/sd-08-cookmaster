const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');

const STATUS_401 = 401;

const auth = async (req, res, next) => {
  const secret = 'xablau';
  const token = req.headers.authorization;
  if (!token)  return res.status(STATUS_401).json({ message: 'Token Not Found'});
  try {
    const decode = jwt.verify(token, secret);
    if (!decode) return res.status(STATUS_401).json({ message: 'jwt malformed' });
    const user = await usersModel.findByEmail(decode.email);   
    req.user = user;
    next();
  } catch (error) { 
    return res.status(STATUS_401).json({ message: 'jwt malformed' });   
  }
};


module.exports = {
  auth,
};
