const { findUserByEmail } = require('../models/usersModel');

const errors = {
  invalidEntries: { message: 'Invalid entries. Try again.' },
  emailRegistered: { message: 'Email already registered' },
};

const statusCode = {
  badRequest: 400,
  conflict: 409,
};

const emailValidation = /^[\w.]+@[\w]+(.[\w]+)+$/;

const blank = (value) => !value;
const invalidEmail = (email) => !email.match(emailValidation);
const isRegisteredEmail = async (email) => await findUserByEmail(email);

const validateUserCreation = async (body) => {
  const { name, email, password } = body;
  switch (true) {
  case blank(name):
  case blank(email):
  case invalidEmail(email):
  case blank(password):
    return { code: statusCode.badRequest, response: errors.invalidEntries };
  };

  if (await isRegisteredEmail(email)) {
    return { code: statusCode.conflict, response: errors.emailRegistered };
  }

  return null;
};

module.exports = {
  validateUserCreation,
};
