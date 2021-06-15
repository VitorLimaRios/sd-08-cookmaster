const express = require('express');
const signUpRouter = require('../router/user.router');
const signInRouter = require('../router/login.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', signUpRouter);
app.use('/login', signInRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (req, res) => {
  res.send();
});

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
