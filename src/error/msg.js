const CODE = require('./code');

const message = {
  'pr-inv': {
    err: {
      'message': 'Invalid entries. Try again.'
    },
    'code': CODE.badRequest
  },
  'email-exist': {
    err: {
      'message': 'Email already registered',
    },
    'code': CODE.conflict
  }
};

module.exports = message;
