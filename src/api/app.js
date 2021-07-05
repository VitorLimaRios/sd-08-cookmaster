const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./controllers/userController');
const uploadController = require('./controllers/uploadController');
const loginController = require('./controllers/loginController');
const recipeController = require('./controllers/recipeController');
// const authService = require('./services/authService');

app.use(bodyParser.json());

// /Teste add imagem usando upload Controller
// app.use('/testeImg', uploadController);

// Req10 visulalizar imagem
const uploadsPath = `${__dirname}/../uploads`;
app.use('/image', express.static(path.join(uploadsPath)));

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipeController);


// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
