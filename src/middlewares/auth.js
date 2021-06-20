const jwt =  require('jsonwebtoken');
const model = require('../models/usersModels');

const secret = 'secretjwt';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256'
};

const STATUS_401 = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const recipes = req.body;
  console.log(recipes);

  // if(Object.keys(recipes).length === 0){
  //   next();
  // }

  if (!token) {
    return res.status(STATUS_401).json({ message: 'jwt malformed' });
  }
  try {

    const decoded = jwt.verify(token, secret);
    const user = await model.findByEmail(decoded.user.email);

    req.user = user;
    next();

  } catch (err) {
    return res.status(STATUS_401).json({ message: err.message });
  }
};
