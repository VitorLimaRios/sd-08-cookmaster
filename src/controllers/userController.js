// o controller aplica as requisições e responses às funções refinadas do services
const usersServices = require('../services/usersServices');

const { responsesNCodes: { OK, CREATED } } = require('../utils/errorsNCodes');

const getAll = async (_req, res) => {
  return res.status(OK.status).send({ allUsers: await usersServices.getAllUsers() })
};

const login = async (req, res) => {
  const { username: reqUsername, password: reqPassword } = req.body;
  const tokenGenerated = await usersServices.loginUser(reqUsername, reqPassword)
  return res.status(200).send({ token: tokenGenerated })
};

const create = async (req, res) => {
  const newUser = req.body;
  const addedUser = await usersServices.addNewUser(newUser);
  return res.status(CREATED.status).send(addedUser);
};


module.exports = { create, getAll, login }

