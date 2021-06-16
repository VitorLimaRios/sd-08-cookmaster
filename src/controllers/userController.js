const express = require('express');

const UserModel = require('../models/userModel');
const { 
  verifyUser,
  checkPermission,
  validateJWT,
  status,
} = require('../middlewares/validations');

const routes = express.Router();

// Criar usuário
routes.post('/', verifyUser, async (req, res) => {
  const { name, email, password } = req.body;
  
  const role = 'user';
  const user = await UserModel.createUser(name, email, password, role);

  return res.status(status.created).json({ user });
});

// Listar todos os usuários
routes.get('/', async (_req, res) => {
  const users = await UserModel.getAllUsers();

  return res.status(status.ok).json({ users });
});

// Criar usuário admin
routes.post('/admin', validateJWT, checkPermission, async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;

  const user = await UserModel.createUser(name, email, password, role);

  return res.status(status.created).json({ user });
});

module.exports = routes;
