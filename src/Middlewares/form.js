const { verifyByEmail } = require('../services/userManagement.service');
const { StatusCodes: { 
  BAD_REQUEST, 
  CONFLICT, 
  UNAUTHORIZED 
} } = require('http-status-codes');

const verifyEmail = async (email) => {
  const isValid = await verifyByEmail(email);
  if(isValid) throw new Error('Email already registered');
  return isValid;
};

const verifyFormatEmail = (email) => {
  const isValid = new RegExp('.+@[A-z]+[.]com').test(email);
  if(!isValid) throw new Error('Invalid entries. Try again.');
  return isValid;
};

exports.validateEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    verifyFormatEmail(email);
    await verifyEmail(email);
    next();
  } catch (err) {
    if(err.message === 'Email already registered')
      return res.status(CONFLICT).json({ message: err.message });
    res.status(BAD_REQUEST).json({ message: err.message });
  } 
};

exports.validateForm = (req, res, next) => {
  try {
    const { name,  password } = req.body;
    if(!name  || !password) 
      throw new Error('Invalid entries. Try again.');
    next();
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

exports.validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) 
      throw new Error('All fields must be filled');
    next();
  } catch (err) {
    res.status(UNAUTHORIZED).json({ message: err.message });
  }
};