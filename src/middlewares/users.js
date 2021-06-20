const Joi = require('joi');

const HTTP_Bad_Request = 400;
const invalidEntries = { message: 'Invalid entries. Try again.' };

/* Referência: https://app.betrybe.com/course/back-end/nodejs/jwt/solutions */
const validateBody = (body) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(body);

const validateNewUser = async (req, res, next) => {
  const { error } = validateBody(req.body);

  if (error) {
    return res.status(HTTP_Bad_Request).json(invalidEntries);
  }
  next();
};

module.exports = {
  validateNewUser,
};
