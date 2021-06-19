const userModels = require('../models/userModels');

const addUser = async (name, email, password) => {
  const addUser = await userModels.addUser(name, email, password);
  // foi feito o Spread operator para não aparecer o password no resultado
  const { password: pass, ...dbuser } = addUser;

  return dbuser;
};

module.exports = {
  addUser,
};