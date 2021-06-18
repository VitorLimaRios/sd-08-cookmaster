const UNAUTHORIZED = 401;
const PASSWORD_LENGTH = 4;

const errors = {
  incorrect_info: 'Incorrect username or password',
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0]+(?:\.[a-zA-Z0-9-]+)*$/;// Regex retirado do site https://regexr.com/3e48o
  if (!emailRegex.test(email)) return { UNAUTHORIZED, message: errors.incorrect_info };
};

const validatePassword = (password) => {
  if (password.length < PASSWORD_LENGTH) 
    return { UNAUTHORIZED, message: errors.incorrect_info };
};

module.exports = {
  validateEmail,
  validatePassword
};
