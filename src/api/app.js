const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const recipesController = require('./controllers/recipesController');
const imagesController = require('./controllers/imagesController');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname + '/uploads')));

app.use('/users', usersController);
app.use('/login', loginController);
app.use('/recipes', recipesController);
app.use('/images', imagesController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

module.exports = app;
