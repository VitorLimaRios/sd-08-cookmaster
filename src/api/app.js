const express = require('express');
const bodyParser = require('body-parser');
const user = require('../../controllers/user');
const loginController = require('../../controllers/login');
const recipes = require('../../controllers/recipes');

const errorMiddleware = require('../../controllers/error');
const validateJWT = require('../../controllers/jwtValidator');
const validateRecipeForm = require('../../controllers/formValidator');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

//Listar todos os usuários
app.get('/users', user.getAllUsers );
// Criar usuário
app.post('/users', user.createUsers);
//Criar login
app.post('/login', loginController);
//Criar receitas
app.post('/recipes', validateJWT, validateRecipeForm, recipes.createRecipe);
//Pegar todas as receitas
app.get('/recipes', recipes.getAll);
//Pegar receitas pelo ID
app.get('/recipes/:id', recipes.getById);
//Atualizar receitas
app.put('/recipes/:id', validateJWT, validateRecipeForm, recipes.update);
//Deletar receitas
app.delete('/recipes/:id', validateJWT, recipes.remove);

app.use(errorMiddleware);

module.exports = app;