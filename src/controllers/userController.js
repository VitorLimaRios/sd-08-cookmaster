// o controller aplica as requisições e responses às funções refinadas do services
const usersServices = require('../services/usersServices');

const create = async (req, res) => {
  const newUser = req.body;
  await usersServices.addNewUser(newUser);
  // acrescentar a firulagem disso

}
