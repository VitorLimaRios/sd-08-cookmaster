const { getByPassword } = require('../models/users/users');

const validPassword = async (password) => {
  const result = await getByPassword(password);
  return result;
};

module.exports = validPassword;
