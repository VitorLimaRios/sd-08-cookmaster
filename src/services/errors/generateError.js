const errorMsgs = {
  INVALID_ENTRIES: 'Invalid entries. Try again.'
};

const generateError = (errorMessage, errorCode) => (
  {
    errorMessage,
    errorCode
  }
);

module.exports = {
  errorMsgs,
  generateError,
};
