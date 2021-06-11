const usersModels = require('../models/users');

const status_400 = 400;
const status_201 = 201;

const isValidEmail = (email) => {
  const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const validEmail = regexEmail.test(email);
  if (!email || !validEmail) return false;
  return true;
};

const isValidName = (name) => {
  if (!name) return false;
  return true;
};

const isValidPassword = (password) => {
  if (!password) return false;
  return true;
};

const isValidReqBody = async (req, res, next) => {
  const {name, email, password} = await req.body;
  if (!name || !email || !password) {
    return res.status(status_400 ).json({
      'message': 'Invalid entries. Try again.'
    });
  };
  res.status(status_201).send();
  return next();
};

module.exports = {
  isValidReqBody,
};
