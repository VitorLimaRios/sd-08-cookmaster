const userModels = require('../models/userModels');

const addUser = async (name, email, password) => {
  const addUser = await userModels.addUser(name, email, password);
  // foi feito o Spread operator não aparecer o password
  const { password: pass, ...dbuser } = addUser;

  return dbuser;
};

module.exports = {
  addUser,
};