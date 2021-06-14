const express = require('express');
const userController = require('../controllers/userController');
const recipesController = require('../controllers/recipesController');
const auth = require('../middlewares/auth');
const tokenValidation = require('../middlewares/tokenValidation');
const validUser = require('../middlewares/validUser');

const app = express();

app.use(express.json());

app.post('/users', userController.createUser);

app.post('/login', auth);

app.post('/recipes', tokenValidation, recipesController.createRecipes);

app.get('/recipes', recipesController.getRecipes);

app.get('/recipes/:id', recipesController.findRecipes);

app.put('/recipes/:id', tokenValidation, validUser, recipesController.updateRecipes);

app.delete('/recipes/:id', tokenValidation, validUser, recipesController.deleteRecipes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
