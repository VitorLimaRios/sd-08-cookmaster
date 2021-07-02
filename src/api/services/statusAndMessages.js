const status = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHENTICATED: 401,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const message = {
  serverError: {message: 'Sistema Indisponível'},
  loginEmpty: {message: 'All fields must be filled'},
  loginIncorrect: {message: 'Incorrect username or password'},
  tokenError: {message:'jwt malformed'},
  invalidEntries: {message: 'Invalid entries. Try again.'},
  emailAlreadyRegistered: {message: 'Email already registered'},
};

module.exports = {status, message};