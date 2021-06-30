const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
const {status, message} = require('../services/statusAndMessages');

const secret = 'RaulSeixas';

const authService = async (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) {
    return res.status(status.UNAUTHENTICATED).json(message.tokenError);
  }
  try {
    const decodedPayload = jwt.verify(token, secret);
    // console.log(decodedPayload.email);

    const userFindInDb = await loginModel.findEmail(decodedPayload.email);
    // console.log(userFindInDb);
    if(!userFindInDb) {
      res.status(status.UNAUTHENTICATED).json(message.tokenError);
    }

    req.user = userFindInDb;
    // console.log(req.user);

    next();

  } catch (error) {
    return res.status(status.UNAUTHENTICATED).json(message.tokenError);
  }
};

module.exports = authService;