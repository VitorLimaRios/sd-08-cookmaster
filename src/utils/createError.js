const INTERNAL_ERROR = 500;

module.exports = (message, code = 'invalid_data') => ({
  err: {
    code,
    message
  }
});
