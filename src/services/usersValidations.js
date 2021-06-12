const usersModel = require('../models/usersModel');
const {
  errors: {
    Users: {
      mustHaveName, mustHaveEmail, mustHavePassword, emailMustBeUnique }
  },
  responses } = require('../utils/errorsNCodes');

const validateUserCreation = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(mustHaveName.status).send(mustHaveName.message);
  if (!email) return res.status(mustHaveEmail.status).send(mustHaveEmail.message);
  if (!password) return res.status(mustHavePassword.status).send(mustHavePassword.message);
  const checkEmailUnique = await usersModel.getAllTheUsers().find((database) => database.email === email);
  if (!checkEmailUnique) return res.status(emailMustBeUnique.status).send(emailMustBeUnique.message);
  next();
};

module.exports = { validateUserCreation };
