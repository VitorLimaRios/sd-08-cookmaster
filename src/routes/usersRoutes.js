const express = require('express');
const usersRoutes = express.Router();
const { 
  createUser,
  checkName,
  checkEmail,
  checkPassword,
  checkEmailUnique,
  checkRole,
} = require('../controllers/usersControllers');

usersRoutes.post('/', checkName, checkEmail, checkPassword, 
  checkEmailUnique, checkRole, createUser);


module.exports = usersRoutes;