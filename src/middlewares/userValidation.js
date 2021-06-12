const userSchema = require('../schema/users');

module.exports = (req, _res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) return next(error);

  next();
};