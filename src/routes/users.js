const express = require('express');
const app = express();

const users = require('../controllers/users');

app.post('/', users.addUser);

module.exports = app;