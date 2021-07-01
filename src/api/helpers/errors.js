const message = (message) => ({ message });

const errors = {
  invalidEntries: message('Invalid entries. Try again.'),
  emailRegistered: message('Email already registered'),
  fieldNotFilled: message('All fields must be filled'),
  wrongPassword: message('Incorrect username or password'),
  jwtMalformed: message('jwt malformed'),
  recipeNotFound: message('recipe not found'),
  missingToken: message('missing auth token'),
  unauthorizedUser: message('unauthorized user'),
  onlyAdmin: message('Only admins can register new admins'),
};

module.exports = errors;
