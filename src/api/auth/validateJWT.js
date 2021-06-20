const jwt = require('jsonwebtoken');
const Model = require('../../models/UserModel');

const secret = 'ayrtonSenha';
const Error401 = 401;

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(Error401).json({ message: 'missing auth token' });
  }


  try {
    const decoded = jwt.verify(token, secret);

    const allUsers = await Model.getAll();

    const user = allUsers.find((user) => user.name === decoded.data.name);

    if(!user) {
      return res.status(Error401).json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(Error401).json({ message: 'jwt malformed' });
  }
};
