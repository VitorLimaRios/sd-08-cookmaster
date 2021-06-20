const HTTP = require('./httpStatusCodes');

module.exports = (status = HTTP.BAD_REQUEST, message) => {
  return { status, result: { message } };
};
