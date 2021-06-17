const rescue = require('express-rescue');
const service = require('../services/Users');
const userSchema = require('../schemas/UserSchema');

const CREATED = 201;

const create = rescue(async (req, res, next) => {

  const { error } = userSchema.validate(req.body);
  
  if (error) return next(error);
  
  const { name, email, password } = req.body;
  
  const user = await service.create({ name, email, password });
  
  if (user.error) return next(user.error);
  
  res.status(CREATED).json(user);
});

module.exports = {
  create,
};