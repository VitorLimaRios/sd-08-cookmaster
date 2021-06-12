const express = require('express');

const { usersController } = require('../controllers');
const {
  usersCreate,
} = usersController;

const users = express.Router();

users.post('/users', usersCreate);

module.exports = users;
