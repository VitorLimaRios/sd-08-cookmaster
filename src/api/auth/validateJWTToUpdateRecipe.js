const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;

const secret = 'issoesegredo';

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  // if (!token) {
  //   return res.status(UNAUTHORIZED).json({ error: 'jwt malformed' });
  // }
  // if (token === '') {
  // return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  // }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.getByEmail(decoded.data.email);

    if (user) {
      const { password, ...authenticatedUser } = user;
      req.user = authenticatedUser;
    }

    next();
  } catch (err) {
    err.message === 'jwt must be provided'
      ? res.status(UNAUTHORIZED).json({ message: 'missing auth token' })
      : res.status(UNAUTHORIZED).json({ message: err.message });
  }
};
