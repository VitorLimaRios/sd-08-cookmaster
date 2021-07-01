const { findUserByEmail } = require('../models/usersModel');
const validations = require('../helpers/validations');
const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');

const validateUserCreation = async (body) => {
  const { name, email, password } = body;
  const { blank, invalidEmail, isRegisteredEmail } = validations;
  const { badRequest, conflict } = statusCode; 
  const { invalidEntries, emailRegistered } = errors;

  switch (true) {
  case blank(name):
  case blank(email):
  case invalidEmail(email):
  case blank(password):
    return { code: badRequest, response: invalidEntries };
  };

  if (await isRegisteredEmail(email)) {
    return { code: conflict, response: emailRegistered };
  }

  return null;
};

const validateTokenGeneration = async (data) => {
  const { email, password } = data;
  const { blank, wrongPass } = validations;
  const { unauthorized } = statusCode;
  const { fieldNotFilled, wrongPassword } = errors;

  switch (true) {
  case blank(email):
  case blank(password):
    return { code: unauthorized, response: fieldNotFilled };
  };

  const user = await findUserByEmail(email);
  if (!user) return { code: unauthorized, response: wrongPassword };

  const { password: userPass } = user;
  if (wrongPass(password, userPass)) {
    return { code: unauthorized, response: wrongPassword };
  }

  return null;
};

const noAdmin = (user) => {
  const { forbidden } = statusCode;
  const { onlyAdmin } = errors;
  if (user.role !== 'admin') return { code: forbidden, response: onlyAdmin };
  return null;
};

module.exports = {
  noAdmin,
  validateUserCreation,
  validateTokenGeneration,
};
