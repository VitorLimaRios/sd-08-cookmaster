const { checkSchema } = require('express-validator');
const msg = require('./ErrorMessages');

module.exports = {
  signup: checkSchema({
    name: {
      trim: true,
      notEmpty: true,
      errorMessage: { code: msg.status.badRequest, message: msg.invalidEntries },
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: { code: msg.status.badRequest, message: msg.invalidEntries },
    },
    password: {
      notEmpty: true,
      errorMessage: { code: msg.status.badRequest, message: msg.invalidEntries },
    },
  }),
  login: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: { code: msg.status.unauthorized, message: msg.entriesNotFound },
    },
    password: {
      notEmpty: true,
      errorMessage: { code: msg.status.unauthorized, message: msg.entriesNotFound },
    },
  }),
};
