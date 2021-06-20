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


// //Atualizar produtos
// app.put('/products/:id', products.updateProduct);
// //Deletando produtos
// app.delete('/products/:id', products.deleteProduct);

// //Listar todas as vendas
// app.get('/sales', sales.getAllSales );
// //Procurar por ID
// app.get('/sales/:id', sales.getById);
// // Criar vendas
// app.post('/sales', sales.createSales);
// //Atualizar vendas
// app.put('/sales/:id', sales.updateSale);
// //Deletando produtos
// app.delete('/sales/:id', sales.deleteSale);

app.use(errorMiddleware);

module.exports = app;