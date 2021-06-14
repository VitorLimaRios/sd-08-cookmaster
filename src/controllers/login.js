const jwt = require('jsonwebtoken');
const usersModels = require('../models/users');

const secreat = 'projetocookmaster';

// // LOGIN USER
const login = async (req, res) => {
  const { name, password } = req.body;
  const bdLogin = await usersModels.login;
  
  console.log('TESTE', bdLogin);
};

module.exports = {
  login,
};
