const User = require('../../models/users/Users');

const create = async (name, email, password) => await User.create(name, email, password);
const getByEmail = async (email) => await User.getByEmail(email);

module.exports = {
  create,
  getByEmail,
};
