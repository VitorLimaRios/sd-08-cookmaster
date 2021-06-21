const joi = require('joi');
const model = require('../models/usersModel');

const INVALID_ENTRIES = 'Invalid entries. Try again.';
const BAD = 400;
const CONFLICT = 409;

const addUserSchema = joi.object({
  name: joi
    .string()
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .required(),
});

const create = async (user) => {
  const { error } = addUserSchema.validate(user);
  if (error) {
    return {
      verifyError: true,
      error: { message: INVALID_ENTRIES },
      status: BAD,
    };
  }

  const { email } = user;
  const emailInDB = await model.readByEmail(email);

  if(emailInDB) {
    console.log('******************');
    console.log(emailInDB);
    console.log('******************');
    return {
      verifyError: true,
      error: { message: 'Email already registered' },
      status: CONFLICT,
    };
  }

  const resp = await model.create({ ...user, role: 'user' });
  const { password, ...data } = resp;
  return { user: data };
};

module.exports = {
  create,
};
