const error = (message) => {
  return {
    success: false,
    err: message,
  };
};

module.exports = error;
