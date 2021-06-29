const { ObjectId } = require('mongodb');
const { findUserByEmail } = require('../models/usersModel');

const emailValidation = /^[\w.]+@[\w]+(.[\w]+)+$/;

const blank = (value) => !value;
const invalidEmail = (email) => !email.match(emailValidation);
const isRegisteredEmail = async (email) => await findUserByEmail(email);
const wrongPass = (pass, userPass) => pass !== userPass;
const invalidId = (id) => !ObjectId.isValid(id);

module.exports = {
  blank,
  invalidEmail,
  invalidId,
  isRegisteredEmail,
  wrongPass,
};
