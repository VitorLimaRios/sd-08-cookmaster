module.exports = {
  status: {
    badRequest: 400,
    created: 201,
    conflict: 409,
    unauthorized: 401,
    ok: 200,
    notFound: 404,
  },
  invalidEntries: 'Invalid entries. Try again.',
  entriesNotFound: 'All fields must be filled',
  notUnique: 'Email already registered',
  loginInvalid: 'Incorrect username or password',
  errorJWT: 'jwt malformed',
  recipeNotFound: 'recipe not found',
};
