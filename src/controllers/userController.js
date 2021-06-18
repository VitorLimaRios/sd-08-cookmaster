// o controller aplica as requisições e responses às funções refinadas do services
const usersServices = require('../services/usersServices');
const { errors: { Users: mustHaveEmail, mustHaveName, mustHavePassword } } = require('../utils/errorsNCodes');

const { responsesNCodes: { OK, CREATED } } = require('../utils/errorsNCodes');

const listUsers = async (_req, res) => {
  return res.status(OK.status).send({ allUsers: await usersServices.getAllUsers() });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const tokenGenerated = await usersServices.loginUser(email, password);
  return res.status(OK.status).send(tokenGenerated);
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const addedUser = await usersServices.addNewUser({ name, email, password });
    return res.status(CREATED.status).send(addedUser);
  }
  catch (error) {
    const objMessage = JSON.parse(error.message);
    return res.status(objMessage.status).send(
      objMessage.send
    );
  }

};


module.exports = { createUser, listUsers, login };

