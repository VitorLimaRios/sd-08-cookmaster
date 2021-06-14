const jwt = require('jsonwebtoken');
const userModel = require('./Models/userModel');

const secret = 'seusecretdetoken';
const INVALID = 401;

// const userToken = jwt.sign({ data: user }, secret, jwtConfig);

const INVALID_TOKEN = 400;

const recipesAuth = async (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) {
    // console.log(token);
    return res.status(INVALID).json({ 'message': 'missing auth token' });
  }
  
  try {
    const decoded = jwt.verify(token, secret);
    // console.log(decoded);
    
    
    const user = await userModel.findEmail(decoded.email);
    // console.log('aoba', user);

    if (!user)
      return res.status(INVALID).json({ 'message': 'jwt malformed' });

    req.user = user;

    next();
  } catch(e) {
    return res.status(INVALID).json({ 'message': 'jwt malformed' });
  };
};
module.exports = recipesAuth;
