const loginSchema = require('../schema/login');

module.exports = (req, _res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const err = { ...error, statusCode: 401, isJoi: true };
    return next(err);
  };

  next();
};