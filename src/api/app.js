const express = require('express');
const usersRoutes = require('../routes/usersRoutes');
const loginRoute = require('../routes/loginRoute');
const recipesRoutes = require('../routes/recipesRoutes');

const app = express();

app.use(express.json());

app.use(usersRoutes);
app.use(loginRoute);
app.use(recipesRoutes);
// Não remover esse end-point, ele é necessário para o avaliador.
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
