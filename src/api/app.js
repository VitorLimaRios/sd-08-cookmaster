const express = require('express');
const { resolve } = require('path');
const uploadFile = require('../middlewares/uploadImage');
const validateJWT = require('../auth/validateJWT');
const usersController = require('../controllers/users');
const loginController = require('../controllers/login');
const recipesController = require('../controllers/recipes');

const app = express();

const uploadPath = resolve(__dirname, '..', 'uploads');
app.use(express.json());

app.get('/users', usersController.getUsers);
app.post('/users', usersController.createUser);
app.post('/login', loginController.login);
app.post('/recipes', validateJWT, recipesController.createRecipe);
app.get('/recipes', recipesController.getRecipes);
app.get('/recipes/:id', recipesController.findRecipe);
app.put('/recipes/:id', validateJWT, recipesController.updateRecipe);
app.delete('/recipes/:id', validateJWT, recipesController.deleteRecipe);
app.put(
  '/recipes/:id/image',
  validateJWT,
  uploadFile(uploadPath),
  recipesController.uploadImage
);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
