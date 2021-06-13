const express = require('express');
const usersServices = require('../services/usersServices');
const { status, message } = require('../schema/status');

const routes = express.Router();

const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

routes.post('/', async (req, res) => {
  const { body } = req;
  const response = await usersServices.login(body);
  if (response.isError) return res.status(status.unauthorized)
    .json({ message: message.allFilled });
  if (response.isWrong) return res.status(status.unauthorized)
    .json({ message: message.incorrectFields });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: response }, secret, jwtConfig);
  return res.status(status.OK).json({ token });
});

module.exports = routes;
