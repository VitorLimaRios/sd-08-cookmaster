const jwt = require('jsonwebtoken');
const model = require('../models/userModel');

const secret = 'socorro123';
const fail = 401;
const fail2 = 400;

const validate = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(fail).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await model.findUser(decoded.email);

    if (!user) {
      return res.status(fail).json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(fail).json({ message: err.message });
  }
};

module.exports = validate;