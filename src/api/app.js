const express = require('express');
const path = require('path');
const { errorHandler, notFoundHandler } = require('./middlewares');
const { Users, Login, Recipes } = require('./routes');
const { resources } = require('./.env');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(`/${resources.Users.basePath}`, Users);
app.use(`/${resources.Login.basePath}`, Login);
app.use(`/${resources.Recipes.basePath}`, Recipes);


app.use('/:notFound', notFoundHandler);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(errorHandler);

module.exports = app;
