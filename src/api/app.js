const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/login');
const recipesRouter = require('./routes/recipesRouter');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.static(__dirname + '/src/uploads'));

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

module.exports = app;
