const Users = require('../services/users');

const HTTP_OK = 200;
const HTTP_Created = 201;
const HTTP_Conflict = 409;

const emailAlreadyRegistered = {
  'message': 'Email already registered'
};

const getAll = async (req, res) => {
  const users = await Users.getAll();

  res.status(HTTP_OK).json(users);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await Users.create(name, email, password);
  
  if (newUser) {
    res.status(HTTP_Created).json(newUser);
  } else {
    res.status(HTTP_Conflict).json(emailAlreadyRegistered);
  }
};

module.exports = {
  getAll,
  create
};