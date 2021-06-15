const { STATUS_CODES } = require('http');

const CODE = {
  'ok': 200,
  'created': 201,
  'badRequest': 400,
  'unauthorized': 401,
  'conflict': 409,
  'internalError': 500,
};

module.exports = CODE;
