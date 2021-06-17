const { verify } = require('../../jwt.config');
const { verifyById } = require('../services/userManagement.service');
const { StatusCodes: { 
  UNAUTHORIZED, 
} } = require('http-status-codes');

const getAuth = (authorization) => {
  if(!authorization) 
    throw new Error('missing auth token');
  const { user } = verify(authorization);
  return { user };
};

exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const { user } = getAuth(authorization);
    await verifyById(user._id);
    req.user = user ;
    next();
  } catch (err) {
    res.status(UNAUTHORIZED).json({ message: err.message });
  }
};

