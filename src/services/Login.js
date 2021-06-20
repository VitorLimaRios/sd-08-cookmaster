const Users = require('../models/Users');

const login = async (credentials) => {
  const { email, password } = credentials;

  const user = await Users.findByEmail(email);

  if (!user || (!user.password !== password)) {
    return {
      error: {
        code: 401,
        message: 'Incorrect username or password'
      }
    };
  }
};

module.exports = {
  login,
};