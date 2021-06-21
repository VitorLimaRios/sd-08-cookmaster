const express = require('express');
const bodyParser = require('body-parser');
const { userRouter, loginRouter, recipeRouter } = require('../routes');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);

app.use(express.static(`${__dirname}/uploads`));

// following line found in the readme
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
