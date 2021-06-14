const { STATUS_CODES } = require('http');

const CODE = {
  'created': 201,
  'conflict': 409,
  'badRequest': 400,
  'internalError': 500,
};

module.exports = CODE;
