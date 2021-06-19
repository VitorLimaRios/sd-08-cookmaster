const customError = (message, code = 'invalid_data') => ({
  err: {
    code,
    message
  }
});

module.exports = customError;