const express = require('express');
const app = express();

const login = require('../controllers/login');

app.post('/', login.loginUser);

module.exports = app;