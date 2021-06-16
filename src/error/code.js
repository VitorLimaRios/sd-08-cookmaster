const { STATUS_CODES } = require('http');

const CODE = {
  'ok': 200,
  'created': 201,
  'notContent': 204,
  'badRequest': 400,
  'unauthorized': 401,
  'notFound': 404,
  'conflict': 409,
  'internalError': 500,
};

module.exports = CODE;
