const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const userModel = require('../models/usersModel');
const recipesModel = require('../models/recipesModel');
const { createUser, listUsers, login } = require('../controllers/userController');
const {
  validateUserCreation,
  checkLoginRequest } = require('../services/usersValidations');
const {
  listRecipes, searchRecipe, addRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipesController');
const { checkIdSearch, validateToken } = require('../services/recipesValidations');
app.use(bodyParser.json());
// ...

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.resolve('src', 'uploads')));


// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', createUser);
app.post('/login', checkLoginRequest, login);
app.get('/recipes', listRecipes);
app.post('/recipes', validateToken, addRecipe);
app.get('/recipes/:id', checkIdSearch, searchRecipe);
app.put('/recipes/:id', validateToken, checkIdSearch, updateRecipe);
app.delete('/recipes/:id', validateToken, checkIdSearch, deleteRecipe);

// routes for testing
app.get('/users', listUsers);
// app.put('/recipes/:id', async (req, res) => {
//   const idParams = req.params;
//   await recipesModel.updateRecipeById(idParams.id, req.body);
//   const updated = await recipesModel.getRecipeById(idParams.id);
//   return res.send({ updatedRecipe: updated });
// });
app.get('/user', userModel.findUserByName);

app.delete('/users', async (req, res) => {
  await userModel.deleteUserByName(req.body.name);
  return res.status(200).send({ message: `usuário deletado ${req.body.name}` });
});

module.exports = app;
