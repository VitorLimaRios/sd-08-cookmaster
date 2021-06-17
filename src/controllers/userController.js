// o controller aplica as requisições e responses às funções refinadas do services
const usersServices = require('../services/usersServices');

const { responsesNCodes: { OK, CREATED } } = require('../utils/errorsNCodes');

const listUsers = async (_req, res) => {
  return res.status(OK.status).send({ allUsers: await usersServices.getAllUsers() });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const tokenGenerated = await usersServices.loginUser(email, password);
  console.log(email);
  return res.status(OK.status).send(tokenGenerated);
};

const createUser = async (req, res) => {
  const newUser = req.body;
  const addedUser = await usersServices.addNewUser(newUser);
  return res.status(CREATED.status).send(addedUser);
};


module.exports = { createUser, listUsers, login };

