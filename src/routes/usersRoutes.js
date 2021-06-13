const express = require('express');
const usersRoutes = express.Router();
const { 
  createUser,
  checkName,
  checkEmail,
  checkPassword,
  checkEmailUnique,
  checkRole,
  checkLogin,
} = require('../controllers/usersControllers');

usersRoutes.post('/', checkName, checkEmail, checkPassword, 
  checkEmailUnique, checkRole, createUser);

usersRoutes.post('/login', checkLogin );

module.exports = usersRoutes;