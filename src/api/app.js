const express = require('express');
const usersRoutes = require('../routes/usersRoutes');
const loginRoute = require('../routes/loginRoute');
const recipesRoutes = require('../routes/recipesRoutes');
const imagesRoute = require('../routes/imagesRoute');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/uploads'));
app.use(usersRoutes);
app.use(loginRoute);
app.use(recipesRoutes);
app.use(imagesRoute);
// Não remover esse end-point, ele é necessário para o avaliador.
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
