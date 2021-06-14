const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer');
// const path = require('path');
const { isValidName, isValidEmail, isValidPassword } = require('../middlewares/users');
const usersControllers = require('../controllers/users');
// const userAuth = require('../controllers/login');
const app = express();
app.use(bodyParser.json());

//const recipesControllers = ('../controllers/recipes');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
app.post('/users', isValidName, isValidEmail, isValidPassword, usersControllers.create);
// app.post('/login', usersControllers.login);

// app.post('/recipes', tokenValidation, recipesController.create);
// app.get('/recipes', recipesController.getAll);

// app.get(recipeId, recipesController.findById);
// app.put(recipeId, tokenValidation, recipesController.updateById);
// app.delete(recipeId, tokenValidation, recipesController.deleteById);


module.exports = app;
