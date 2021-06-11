const code = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE: 400,
  CONFLICT: 409,
};

const message = {
  invalid_entries: 'Invalid entries. Try again',
  email_registred: 'Email already registred'
};

module.exports = {
  code,
  message,
};