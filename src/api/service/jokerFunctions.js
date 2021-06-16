const validateEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_-]+)@([a-zA-Z_-]+)/;
  return emailRegex.test(email);
};

module.exports = {
  validateEmail
};