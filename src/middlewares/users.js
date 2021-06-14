const usersModels = require('../models/users');

const status_400 = 400;
// const status_409 = 409;
// const status_201 = 201;
const invalidMessage = {
  'message': 'Invalid entries. Try again.'
};

const isValidName = (req, res, next) => {
  const name = req.body.name;
  if (!name) return res.status(status_400).json(invalidMessage);
  next();
};

const isValidEmail = (req, res, next) => {
  const email = req.body.email;  
  const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const validEmail = regexEmail.test(email);
  if (!email || !validEmail) return res.status(status_400).json(invalidMessage); 
  next();
};

const isValidPassword = (req, res, next) => {
  const password = req.body.password;
  if (!password) return res.status(status_400).json(invalidMessage);
  next();
};

module.exports = {
  isValidName,
  isValidEmail,
  isValidPassword,   
};
