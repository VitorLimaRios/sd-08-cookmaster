const usersModel = require('../models/usersModel');
const {
  errors: {
    Users: {
      mustHaveName, mustHaveEmail, mustHavePassword, emailMustBeValid, emailMustBeUnique,
      emailOrPasswordIsMissing, emailOrPasswordIsInvalid }
  }, } = require('../utils/errorsNCodes');

// const checkForBadRequest = async (req, res, next) => {

//   try {
//     // throw new Error('erro do BadRequest');
//     const { name, email, password } = req.body;
//     if (!name) throw new Error(mustHaveName.send.message);
//     if (!email) throw new Error(mustHaveEmail.send.message);
//     if (!password) throw new Error(mustHavePassword.send.message);
//     return next();
//   } catch (error) {
//     //console.log(error);
//     return res.status(422).json({
//       message: error.message,
//     });
//   }
// };

const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  const checkEmailUnique = (await usersModel.getAllTheUsers())
    .find((database) => database.email === email);
  if (checkEmailUnique) {
    return res.status(emailMustBeUnique.status).send(emailMustBeUnique.send);
  }
  return next();
};

const checkLoginRequest = async (req, res, next) => {
  const { email: reqEmail, password: reqPassword } = req.body;
  if (!reqEmail || !reqPassword) {
    return res.status(emailOrPasswordIsMissing.status)
      .send(emailOrPasswordIsMissing.send);
  }
  const existsInDb = await usersModel.findUserByEmail(reqEmail);
  if (!existsInDb || existsInDb.password !== reqPassword) {
    return res.status(emailOrPasswordIsInvalid.status)
      .send(emailOrPasswordIsInvalid.send);
  }
  next();
};

const validateUserCreation = async (req, res, next) => {
  const runCheckEmail = () => checkEmail(req, res, next);
  checkForBadRequest(req, res, runCheckEmail);
};

module.exports = { validateUserCreation, checkLoginRequest };
