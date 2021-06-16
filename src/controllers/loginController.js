const express = require('express');
const jwt = require('jsonwebtoken');

const UsersModel = require('../models/userModel');
const { verifyLogin, status } = require('../middlewares/validations');

const routes = express.Router();

// Login 
routes.post('/', verifyLogin, async (req, res) => {
  const emailBody = req.body.email;
  const user = await UsersModel.findByEmailUser(emailBody);
  const { _id, email, role } = user;
  const secret = 'projectCookmaster';

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ user: { _id, email, role } }, secret, jwtConfig);
  
  if (user) {
    return res.status(status.ok).json({ token });
  }
});

module.exports = routes;
