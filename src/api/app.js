const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Users = require('./controllers/usersController');
const Login = require('./controllers/loginController');
  
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', Users);
app.use('/login', Login);

module.exports = app;
