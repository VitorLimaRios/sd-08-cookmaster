const Users = require('../models/Users');

const UNAUTHORIZED = 401;

const emailValidate = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const loginValidator = async (loginData) => {
  const userFromDB = await Users.findUser(loginData);
  if (!loginData.email || !loginData.password) {
    return {
      error: {
        code: UNAUTHORIZED,
        message: 'All fields must be filled'
      }
    };
  }

  if (!userFromDB || !emailValidate(loginData.email) 
  || loginData.password !== userFromDB.password) return {
    error: {
      code: UNAUTHORIZED,
      message: 'Incorrect username or password'
    }
  };

  return {
    id: userFromDB._id,
    email: userFromDB.email,
    role: userFromDB.role ? 'admin' : 'user'
  };
};

module.exports = loginValidator;