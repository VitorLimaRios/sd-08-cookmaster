// o controller aplica as requisições e responses às funções refinadas do services
const usersServices = require('../services/usersServices');
const jwt = require('jsonwebtoken');
const { responsesNCodes: { OK, CREATED } } = require('../utils/errorsNCodes');

const getAll = async (_req, res) => {
  return res.status(OK.status).send({ allUsers: await usersServices.getAllUsers() })
};

const secret = 'senha123';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const tokenGenerate = async (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ username, password }, secret, jwtConfig);
  console.log(token)
  if (!username || !password) {
    res.status(422).send({ message: 'falta username ou password' })
  }
  return res.status(200).send({ token })
};

const create = async (req, res) => {
  const newUser = req.body;
  const addedUser = await usersServices.addNewUser(newUser);
  return res.status(CREATED.status).send(addedUser);
};


module.exports = { create, getAll, tokenGenerate }

