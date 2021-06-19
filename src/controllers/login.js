const joi = require('joi');
const { customError } = require('../utils');
const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
const { STATUS } = require('../constants');

const secret = 'o-segredo-do-sucesso-é-o-segredo';

const loginSchema = joi.object({
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .required()
});

module.exports = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  
  if (error) return next(customError('All fields must be filled', 'invalid_login'));

  const user = await UserService.getByEmail(req.body.email);

  if (!user || user.password !== req.body.password) {
    return next(customError('Incorrect username or password', 'invalid_login'));
  }

  const { _id, email, role } = user;

  const userPayload = { id: _id, email, role };

  const token = jwt.sign(userPayload, secret);

  res.status(STATUS.OK).json({ token });
};