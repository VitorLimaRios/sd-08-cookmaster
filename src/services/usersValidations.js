const usersModel = require('../models/usersModel');
const {
  errors: {
    Users: {
      mustHaveName, mustHaveEmail, mustHavePassword, emailMustBeUnique }
  },
  responsesNCodes } = require('../utils/errorsNCodes');

const validateUserCreation = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(mustHaveName.status).send(mustHaveName.send);
  if (!email) return res.status(mustHaveEmail.status).send(mustHaveEmail.send);
  if (!password) return res.status(mustHavePassword.status).send(mustHavePassword.send);
  const checkEmailUnique = (await usersModel.getAllTheUsers()).find((database) => database.email === email);
  if (!checkEmailUnique) return res.status(emailMustBeUnique.status).send(emailMustBeUnique.send);
  return next();
};

module.exports = { validateUserCreation };
