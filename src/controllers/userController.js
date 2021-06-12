// o controller aplica as requisições e responses às funções refinadas do services
const usersServices = require('../services/usersServices');
const { responsesNCodes: { OK, CREATED } } = require('../utils/errorsNCodes');

const getAll = async (_req, res) => {
  return res.status(OK.status).send({ allUsers: await usersServices.getAllUsers() })
};

const create = async (req, res) => {
  const newUser = req.body;
  const addedUser = await usersServices.addNewUser(newUser);
  return res.status(CREATED.status).send(addedUser);
};


module.exports = { create, getAll }

