const express = require('express');
const userRouter = require('../router/user.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRouter);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (req, res) => {
  res.send();
});

// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
