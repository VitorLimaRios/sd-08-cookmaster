const express = require('express');
const userControllers = require('../controllers/users');

const users = express.Router();

users.get('/', userControllers.readUsers);
users.post('/', userControllers.createUsers);

module.exports = users;