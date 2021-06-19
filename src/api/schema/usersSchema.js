const { findByEmail } = require('../models/usersModel');
const MIN_LENGTH = 5;
const QUANTITY_ZERO = 0;

const validate = async (name, email, password) => {
  if (!name || !email || !password) return {
    status: 400,
    error: {
      message: 'Invalid entries. Try again.',
    }
  };

  const emailValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!emailValid.test(email)) return  {
    status: 400,
    error: {
      message: 'Invalid entries. Try again.',
    }
  };
  
  return null;
};

const emailExists = async (email) => {
  if (await findByEmail(email)) return {
    status: 409,
    error: {
      message: 'Email already registered'
    }
  };
  return;
};

module.exports = {
  validate,
  emailExists,
};
