const joi = require('joi');
const createError = require('../utils/createError');
const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
const httpStatusCodes = require('../data/httpStatusCodes');

const invalidFieldErrorMessage= 'Incorrect username or password';

const loginSchema = joi.object({
  email: joi
    .string()
    .email()
    .message(invalidFieldErrorMessage)
    .required(),
  password: joi
    .string()
    .required()
}).messages({ 'any.required': 'All fields must be filled' });

module.exports = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(createError(error.details[0].message, 'invalid_login'));

  const user = await UserService.getByEmail(req.body.email);
  if (!user || user.password !== req.body.password) {
    return next(createError('Incorrect username or password', 'invalid_login'));
  }

  const { id, email, role } = user;

  const userPayload = { id, email, role };

  const token = jwt.sign(userPayload, process.env.SECRET);

  res.status(httpStatusCodes.OK).json({ token });
};
