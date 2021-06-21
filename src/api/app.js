const express = require('express');
const bodyParser = require('body-parser');
// const recipesRouter = require('./controllers/recipesRouter');
const userRouter = require('../controllers/userRouter');
const loginRouter = require('../controllers/loginRouter');
require('dotenv');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter );
app.use('/login', loginRouter );
// app.use('/recipes', recipesRouter );


module.exports = app;
