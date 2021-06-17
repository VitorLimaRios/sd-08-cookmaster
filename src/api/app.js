const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { router: userRouter } = require('./routes/usersControler');
const { router: loginRouter } = require('./routes/loginControler');
const { router: recipesRouter } = require('./routes/recipesControler');
const { decodeToken } = require('./service/jwt');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/image', express.static(path.join(__dirname, '..', 'uploadas')));

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

module.exports = app;


