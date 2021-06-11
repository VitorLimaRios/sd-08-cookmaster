const code = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const message = {
  invalid_entries: 'Invalid entries. Try again.',
  email_registred: 'Email already registered',
  fields_must_be_filled: 'All fields must be filled',
  inc_user_or_pass: 'Incorrect username or password',
  jwt_malformed: 'jwt malformed',
  recipe_not_found: 'recipe not found',
};

module.exports = {
  code,
  message,
};