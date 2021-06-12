const express = require('express');
const middlewares = require('../middlewares');
const users = require('../routes/users');
const userController = require('../controllers/User');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', users);

app.post('/login', middlewares.loginValidation, userController.login);

app.use(middlewares.error);

module.exports = app;
