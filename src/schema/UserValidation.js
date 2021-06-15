const STATUS_CODE = 400;
const INVALID_ENTRIES = 'Invalid entries. Try again.';

const validateEmail = (email) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g; // Regex retirado do site https://regexr.com/3e48o
  if (!emailRegex.test(email)) return { STATUS_CODE, message: INVALID_ENTRIES };
};

module.exports = {
  validateEmail,
};
