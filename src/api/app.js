const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer');
// const path = require('path');

const { isValidName, isValidEmail, isValidPassword } = require('../middlewares/users');
const { auth } = require('../middlewares/recipes');
const usersControllers = require('../controllers/users');
const recipesControllers = require('../controllers/recipes');
const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador


app.post('/users', isValidName, isValidEmail, isValidPassword, usersControllers.create);
app.post('/login', usersControllers.login);
app.post('/recipes', auth, recipesControllers.create);
app.get('/recipes', recipesControllers.getAll);
// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));
// app.get(recipeId, recipesController.findById);
// app.put(recipeId, recipesController.updateById);
// app.delete(recipeId, recipesController.deleteById);


module.exports = app;
