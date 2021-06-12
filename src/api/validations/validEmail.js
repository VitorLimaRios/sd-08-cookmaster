const { getByEmail } = require('../models/users/users');

const validEmail = async (email) => {
  const result = await getByEmail(email);
  return result;
};

module.exports = validEmail;
