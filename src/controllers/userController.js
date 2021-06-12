// o controller aplica as requisições e responses às funções refinadas do services
const usersServices = require('../services/usersServices');
const { responsesNCodes: { OK, CREATED } } = require('../utils/errorsNCodes');

const create = async (req, res) => {
  const newUser = req.body;
  const addedUser = await usersServices.addNewUser(newUser);
  return res.status(CREATED.status).send(addedUser);
};


module.exports = { create }

