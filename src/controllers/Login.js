const rescue = require('express-rescue');
const service = require('../services/Login');
const jwt = require('jsonwebtoken');
const loginSchema = require('../schemas/LoginSchema');

const OK = 200;

module.exports = rescue(async (req, res, next) => {

  const { error } = loginSchema.validate(req.body);
  
  if (error) return next(error);

  const { email, password } = req.body;

  const user = await service.login({ email, password });

  if (user.error) return next(user.error);

  const token = jwt.sign(user, process.env.SECRET);

  res.status(OK).json({ token });
});