const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');

const {
  usersRouter,
  loginRouter,
  recipesRouter,
} = require('../routes');
const { showImage } = require('../controllers/recipesController');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images',
  express.static(resolve(__dirname, '..', 'uploads')));

app.use(usersRouter);

app.use(loginRouter);

app.use(recipesRouter);

module.exports = app;
