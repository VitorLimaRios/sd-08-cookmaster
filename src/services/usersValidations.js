const usersModel = require('../models/usersModel');
const {
  errors: {
    Users: {
      mustHaveName, mustHaveEmail, mustHavePassword, emailMustBeValid, emailMustBeUnique }
  }, } = require('../utils/errorsNCodes');

const checkForBadRequest = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(mustHaveName.status).send(mustHaveName.send);
  if (!email) return res.status(mustHaveEmail.status).send(mustHaveEmail.send);
  if (!password) return res.status(mustHavePassword.status).send(mustHavePassword.send);
  return next()
};

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const EMAIL_VALIDATION = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/gi;
  const checkEmailValid = EMAIL_VALIDATION.test(email);
  if (!checkEmailValid) return res.status(emailMustBeValid.status).send(emailMustBeValid.send);
  const checkEmailUnique = (await usersModel.getAllTheUsers()).find((database) => database.email === email);
  if (checkEmailUnique) return res.status(emailMustBeUnique.status).send(emailMustBeUnique.send);
  return next();
}
const validateUserCreation = async (req, res, next) => {
  const runCheckEmail = () => checkEmail(req, res, next);
  checkForBadRequest(req, res, runCheckEmail);
};

module.exports = { validateUserCreation };
