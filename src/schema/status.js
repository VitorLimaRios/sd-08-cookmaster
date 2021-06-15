const status = {
  badRequest: 400,
  conflict: 409,
  created: 201,
  unauthorized: 401,
  OK: 200,
  notFound: 404,
  forbidden: 403,
  noContent: 204,
};

const message = {
  invalidEntries: 'Invalid entries. Try again.',
  emailRegisterd: 'Email already registered',
  allFilled: 'All fields must be filled',
  incorrectFields: 'Incorrect username or password',
  invalidToken: 'jwt malformed',
  recipeNotFound: 'recipe not found',
  authToken: 'missing auth token',
  userAdmin: 'Only admins can register new admins',
};

module.exports = {
  status,
  message,
};
