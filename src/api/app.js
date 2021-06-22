const express = require('express');
const app = express();
app.use(express.json());

const usersRoute = require('../routers/usersRoute');
const loginRoute = require('../routers/loginRoute');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(usersRoute);
app.use(loginRoute);

module.exports = app;
