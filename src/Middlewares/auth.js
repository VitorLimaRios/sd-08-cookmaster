const { verify } = require('../../jwt.config');
const { StatusCodes: { 
  CREATED, UNAUTHORIZED, 
} } = require('http-status-codes');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if(!authorization) 
      throw new Error('missing auth token');
    const { user } = verify(authorization);
    // if(!authorization) 
    //   throw new Error('jwt malformed');
    req.user = user ;
    next();
  } catch (err) {
    res.status(UNAUTHORIZED).json({ message: err.message });
  }
};

