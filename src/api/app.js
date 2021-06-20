const express = require('express');
const users = require('../controllers/Users');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/users', users.createUser);

app.post('/login', users.login);

module.exports = app;
