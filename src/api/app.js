const express = require('express');
const UsersRouter = require('../routes/UsersRouter');
const LoginRouter = require('../routes/LoginRouter');
const RecipesRouter = require('../routes/RecipesRouter');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', UsersRouter);
app.use('/login', LoginRouter);
app.use('/recipes', RecipesRouter);

module.exports = app;
