const { code, message } = require('../helpers/messages');
const usersModel = require('../models/usersModel');

const messageError = (message) => ({ message });

const isValid = (name, email, password) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const emailExist = usersModel.findUserByEmail(email);
  if (typeof name !== 'string' || !name
      || typeof email !== 'string'
      || !regexEmail.test(email)
      || !password) throw new Error(message.INVALID_ENTRIES);
  return {};
};


module.exports = {
  isValid,
  messageError,
};