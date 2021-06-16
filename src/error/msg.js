const CODE = require('./code');

const message = {
  'pr-inv': {
    err: {
      message: 'Invalid entries. Try again.',
    },
    code: CODE.badRequest,
  },
  'email-exist': {
    err: {
      message: 'Email already registered',
    },
    code: CODE.conflict,
  },
  'l-f-invalid': {
    err: {
      message: 'All fields must be filled',
    },
    code: CODE.unauthorized,
  },
  'l-f-incorrect': {
    err: {
      message: 'Incorrect username or password',
    },
    code: CODE.unauthorized,
  },
  'r-i-jwt': {
    err: {
      message: 'jwt malformed'
    },
    code: CODE.unauthorized
  },
  'r-n-found': {
    err: {
      message: 'recipe not found'
    },
    code: CODE.notFound,
  }
};

module.exports = message;
