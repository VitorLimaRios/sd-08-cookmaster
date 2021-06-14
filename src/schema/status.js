const status = {
  badRequest: 400,
  conflict: 409,
  created: 201,
  unauthorized: 401,
  OK: 200,
  notFound: 404,
};

const message = {
  invalidEntries: 'Invalid entries. Try again.',
  emailRegisterd: 'Email already registered',
  allFilled: 'All fields must be filled',
  incorrectFields: 'Incorrect username or password',
  invalidToken: 'jwt malformed',
  recipeNotFound: 'recipe not found',
};

module.exports = {
  status,
  message,
};
