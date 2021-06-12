const userSchema = require('../schema/users');

module.exports = (req, _res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    const err = { ...error, statusCode: 400, isJoi: true };
    return next(err);
  };

  next();
};