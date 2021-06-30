const status = {
  OK: 200,
  CREATED: 201,
  UNAUTHENTICATED: 401,
  SERVER_ERROR: 500,
};

const message = {
  serverError: {message: 'Sistema Indisponível'},
  loginEmpty: {message: 'All fields must be filled'},
  loginIncorrect: {message: 'Incorrect username or password'},
  tokenError: {message:'Token not found'},
};

module.exports = {status, message};