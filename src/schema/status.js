const status = {
  badRequest: 400,
  conflict: 409,
  created: 201,
  unauthorized: 401,
  OK: 200,
};

const message = {
  invalidEntries: 'Invalid entries. Try again.',
  emailRegisterd: 'Email already registered',
  allFilled: 'All fields must be filled',
  incorrectFields: 'Incorrect username or password',
};

module.exports = {
  status,
  message,
};
