const express = require('express');
const loginRoutes = express.Router();
const { 
  checkLogin,
} = require('../controllers/usersControllers');

loginRoutes.post('/', checkLogin );

module.exports = loginRoutes;