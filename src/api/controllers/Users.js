const Users = require('../services/Users');
const jwt = require('jsonwebtoken');

const secret = 'something';

const jwtConfig = {
  algorithm: 'HS256',
};

const getAll = async (_req, res) => {
  const userList = await Users.getAll();
  res.status(200).json(userList);
};

const newUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  const addUser = await Users.newUser(name, email, password);
  if (addUser.err) return res.status(409).json(addUser.err);
  res.status(201).json(addUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const login = await Users.login(email, password);
  console.log(login);
  if (login.err) return res.status(401).json(login.err);

  const token = jwt.sign(login, secret, jwtConfig);
  res.status(200).json({ token });
};

module.exports = {
  getAll,
  newUser,
  login,
};
