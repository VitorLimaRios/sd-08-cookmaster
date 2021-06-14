const { getByEmail } = require('../models/user.model');
const { StatusCodes: { BAD_REQUEST, CONFLICT } } = require('http-status-codes');

const valid = () => ({
  name: (name) => !!(name && name.length >= MAX_SIZE_FIVE),
  quantity: (quantity) => !!(quantity && +quantity >= MIN_SIZE_ONE),
});

exports.validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const isValid = new RegExp('.+@[A-z]+[.]com').test(email);
  try {
    const emailUser = !!await getByEmail(email);
    if(!isValid) throw new Error('Invalid entries. Try again.');
    if(emailUser) throw new Error('Email already registered');
    next();
  } catch (err) {
    if(err.message === 'Email already registered')
      return res.status(CONFLICT).json({ message: err.message });
    res.status(BAD_REQUEST).json({ message: err.message });
  } 
};
exports.validateForm = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) 
      throw new Error('Invalid entries. Try again.');
    next();
  } catch (err) {
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};