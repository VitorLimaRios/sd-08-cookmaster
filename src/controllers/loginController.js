
const express = require('express');
const jwt = require('jsonwebtoken');
const { getUser } = require('../models/usersModel');

const secret = 'secret';
const UNAUTHORIZED = 401;
const OK = 200;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(UNAUTHORIZED).send({ message: 'All fields must be filled' });
  }
  const user = await getUser(email);
  if(!user || user.password !== password) {
    return res.status(UNAUTHORIZED).send({ message: 'Incorrect username or password' });
  }
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  res.status(OK).json({ token });
});

module.exports = router;