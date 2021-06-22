const validateUserData = require('../services/ValidateUserData');

const ValidateUserDataMiddleware = async (req, res, next) => {
  const {name, email, password} = req.body;
  const {status, message, ok} = await validateUserData({name, email, password});

  if (!ok) return res.status(status).json({message});
  next();
};

module.exports = ValidateUserDataMiddleware;