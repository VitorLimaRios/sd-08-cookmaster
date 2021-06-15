const jwt = require('jsonwebtoken');
const userModel = require('./Models/userModel');

const secret = 'segredin';
const CODE_401 = 401;
const CODE_400 = 400;

const authRec = async (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) res.status(CODE_400).json({ message: 'Invalid token' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.findEmail(decoded.email);

    if(!user) res.status(CODE_401).json({ message: 'Invalid token' });

    req.user = user;

    next();
  } catch(e) {
    return res.status(CODE_401).json({ message: e.message });
  }
};

module.exports = authRec;