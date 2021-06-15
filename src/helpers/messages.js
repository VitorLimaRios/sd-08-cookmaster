const code = {
  OK: 200,
  CREATED: 201,
  CONFLICT: 409,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  NO_CONTENT: 204,
};

const message = {
  INVALID_ENTRIES: 'Invalid entries. Try again.',
  EMAIL_ALREADY_REGISTERED: 'Email already registered',
  ALL_FIELDS_MUST_BE_FILLED: 'All fields must be filled',
  INCORRECT_USERNAME_OR_PASSWORD: 'Incorrect username or password',
  NOT_FOUND: 'recipe not found'
};

module.exports = { code, message };