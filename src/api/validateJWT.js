const jwt = require('jsonwebtoken');
const user = require('./models/userModel');

const secret = 'odeioBackEnd';
const invalid = 401; 
const invalid_status = 400;

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(invalid).json({ 'message': 'missing auth token' });

  try {
    const payload = jwt.verify(token, secret);

    const userAccount = await user.findByEmail(payload.email);

    if (!userAccount) return res.status(invalid).json({ 'message': 'jwt malformed' });

    req.user = userAccount;

    next();
  } catch (err) {
    return res.status(invalid).json({message: err.message});
  }
};
