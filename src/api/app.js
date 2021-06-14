const express = require('express');
const bodyParses = require('body-parser');

const UsersController = require('../controllers/usersCon');
const LoginController = require('../controllers/loginCon');
// const middlewares_users = require('../middlewares/usersPost');

const app = express();

app.use(bodyParses.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', UsersController);
app.use('/login', LoginController);

module.exports = app;
