const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');


const UsersController = require('../controllers/UsersController.js');
const RecipesController = require('../controllers/RecipesController.js');
const UsersModels = require('../models/UsersModels');

const BAD_REQ = 400;
const UN_REQ = 401;
const SECRET = 'meuacesso123';

const isValidJWT = async (req, res, next) => {

  const { authorization: token } = req.headers;

  if (!token) {
    return res
      .status(BAD_REQ)
      .json({ message: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    const user = await UsersModels
      .findEmail(decoded.email);

    if (!user) {
      return res
        .status(UN_REQ)
        .json({ message: 'Invalid token' });
    }

    req.user = user;

    next();

  } catch (err) {
    return res
      .status(UN_REQ)
      .json({ message: err.message });
  }
};

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UsersController.addUser);

app.post('/login', UsersController.getLogin);

app.post('/recipes', isValidJWT, RecipesController.addNewRecipe);

app.get('/recipes', RecipesController.getAllRecipes);

module.exports = app;
