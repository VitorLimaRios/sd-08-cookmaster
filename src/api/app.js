const express = require('express');
const usersRoutes = require('../routes/usersRoutes');
const loginRoute = require('../routes/loginRoute');

const app = express();

app.use(express.json());

app.use(usersRoutes);
app.use(loginRoute);
// Não remover esse end-point, ele é necessário para o avaliador.
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
