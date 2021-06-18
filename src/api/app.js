const express = require('express');
const bodyParser = require('body-parser');
const { userRouter, loginRouter, recipeRouter } = require('../routes');

const app = express();

app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipeRouter);

app.use(express.static(`${__dirname}/uploads`));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
