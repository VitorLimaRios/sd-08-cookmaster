const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const CODE_ERR = 401;
const segredo = 'betrybe';

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(CODE_ERR).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, segredo);

    const user = await usersModel.findByEmail(decoded.data.email);

    if (!user) {
      return res
        .status(CODE_ERR)
        .json({ message: 'jwt malformed' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(CODE_ERR).json({ message: err.message });
  }
};