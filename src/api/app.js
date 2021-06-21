const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const user = require('../../controllers/user');
const loginController = require('../../controllers/login');
const recipes = require('../../controllers/recipes');

const errorMiddleware = require('../../controllers/error');
const validateJWT = require('../../controllers/jwtValidator');
const validateRecipeForm = require('../../controllers/formValidator');
const multer = require('../../controllers/multer');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

//Listar todos os usuários
app.get('/users', rescue(user.getAllUsers));
// Criar usuário
app.post('/users', rescue(user.createUsers));
//Criar login
app.post('/login', rescue(loginController));
//Criar receitas
app.post('/recipes', validateJWT, validateRecipeForm, rescue(recipes.createRecipe));
//Pegar todas as receitas
app.get('/recipes', rescue(recipes.getAll));
//Pegar receitas pelo ID
app.get('/recipes/:id', rescue(recipes.getById));
//Atualizar receitas
app.put('/recipes/:id', validateJWT, validateRecipeForm, rescue(recipes.update));
//Deletar receitas
app.delete('/recipes/:id', validateJWT, rescue(recipes.remove));
//Upar imagens
app.put('/recipes/:id/image', validateJWT, multer(), rescue(recipes.uploadImage));

app.use(errorMiddleware);

module.exports = app;