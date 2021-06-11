require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('../controllers/index');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/users', controllers.createUser);
app.post('/login', controllers.login);
app.post('/recipes', controllers.createRecipe);
app.get('/recipes', controllers.getAllRecipes);
app.get('/recipes/:id', controllers.getRecipeById);
app.put('/recipes/:id', controllers.updateRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
