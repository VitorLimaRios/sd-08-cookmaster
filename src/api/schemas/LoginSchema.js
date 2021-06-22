const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().message('Incorrect username or password').required(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'Incorrect username or password',
});

const validateLogin = (req, res, next) => {
  const code = 401;

  const { error } = schema.validate(req.body);
  if (error) return res.status(code).json({ message: error.message });

  next();
};

module.exports = {
  validateLogin,
};
