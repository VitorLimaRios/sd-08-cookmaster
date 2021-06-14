const jwt = require('jsonwebtoken');
const usersModels = require('../models/users');

const secreat = 'projetocookmaster';

// // LOGIN USER
// const login = (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
// };

module.exports = {
  login,
};
