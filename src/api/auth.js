const jwt = require('jsonwebtoken');
const userModel = require('./Models/userModel');

const secret = 'segredin';
const CODE_401 = 401;

const authRec = async (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) {
    return res.status(CODE_401).json({ 'message': 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findEmail(decoded.email);

    if (!user)
      return res.status(CODE_401).json({ 'message': 'jwt malformed' });
    req.user = user;
    next();
  } catch(e) {

    return res.status(CODE_401).json({ 'message': 'jwt malformed' });

  };

};
module.exports = authRec;
