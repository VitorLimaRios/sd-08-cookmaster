const express = require('express');
const bodyParser = require('body-parser');
const User = require('./controllers/users/User');
const validateCreateMiddleware = require('./middlewares/users/validateCreateMiddleware');
const validateLoginMiddleware = require('./middlewares/users/validateLoginMiddleware');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

//Users
app.post('/users', validateCreateMiddleware, User.create);
app.post('/login', validateLoginMiddleware, User.login);

module.exports = app;
