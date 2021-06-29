const { findUserByEmail } = require('../models/usersModel');

const emailValidation = /^[\w.]+@[\w]+(.[\w]+)+$/;

const message = (message) => ({ message });
const blank = (value) => !value;
const invalidEmail = (email) => !email.match(emailValidation);
const isRegisteredEmail = async (email) => await findUserByEmail(email);
const wrongPass = (pass, userPass) => pass !== userPass;

const errors = {
  invalidEntries: message('Invalid entries. Try again.'),
  emailRegistered: message('Email already registered'),
  fieldNotFilled: message('All fields must be filled'),
  wrongPassword: message('Incorrect username or password'),
};

const statusCode = {
  badRequest: 400,
  conflict: 409,
  unauthorized: 401,
};

const validateUserCreation = async (body) => {
  const { name, email, password } = body;
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

module.exports = {
  validateUserCreation,
  validateTokenGeneration,
};
