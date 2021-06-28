const express = require('express');
const UsersRoutes = require('./routes/Users');
const LoginRoutes = require('./routes/Login');
const middleware = require('./middlewares/middlewareError');

const app = express();
app.use(express.json());
app.use('/users',UsersRoutes);
app.use('/login',LoginRoutes);
app.use(middleware.error);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
