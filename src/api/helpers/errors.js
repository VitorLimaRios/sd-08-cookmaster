const message = (message) => ({ message });

const errors = {
  invalidEntries: message('Invalid entries. Try again.'),
  emailRegistered: message('Email already registered'),
  fieldNotFilled: message('All fields must be filled'),
  wrongPassword: message('Incorrect username or password'),
  jwtMalformed: message('jwt malformed'),
};

module.exports = errors;
