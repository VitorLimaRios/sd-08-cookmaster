const { verify } = require('../../jwt.config');
const { StatusCodes: { 
  CREATED, UNAUTHORIZED, 
} } = require('http-status-codes');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const { user } = verify(authorization);
    if(!authorization) 
      throw new Error('jwt malformed');
    req.body.userId = user.id;
    next();
  } catch (err) {
    res.status(UNAUTHORIZED).json({ message: err.message });
  }
};