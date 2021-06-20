const express = require('express');

const app = express();

const path = require('path');

const userRouter = require('../routes/User');
const loginRouter = require('../routes/Login');
const recipesRouter = require('../routes/Recipes');


app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/recipes', recipesRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
