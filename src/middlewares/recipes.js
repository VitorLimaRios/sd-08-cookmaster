const jwt = require('jsonwebtoken');
// const Users = require('../models/users');

const HTTP_Unauthorized = 401;

const missingAuthToken = { 'message': 'missing auth token' };
const JWTmalformed = { 'message': 'jwt malformed' };

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  const JWT_SECRET = 'meuSegredoSuperSecreto';

  if (!token) {
    res.status(HTTP_Unauthorized).json(missingAuthToken);
  } 
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // console.log(payload);

    if (!payload) { 
      return res.status(HTTP_Unauthorized).json(JWTmalformed);
    } else { 
      // const authenticated_user = await Users.getEmail(payload.email);
      // console.log(authenticated_user);
      // req.user = authenticated_user;
      req.user = payload;

      return next();
    }
  } catch (error) {
    return res.status(HTTP_Unauthorized).json(JWTmalformed);
  }
};

module.exports = {
  auth
};