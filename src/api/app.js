const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../controllers/userRouter');
const loginRouter = require('../controllers/loginRouter');
const recipesRouter = require('../controllers/recipesRouter');
const imageRouter = require('../controllers/imageRouter');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter );
app.use('/login', loginRouter );
app.use('/recipes', recipesRouter );
app.use('/images', imageRouter );


module.exports = app;
