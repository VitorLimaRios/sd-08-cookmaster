const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');


const UsersController = require('../controllers/UsersController.js');
const RecipesController = require('../controllers/RecipesController.js');
const UsersModels = require('../models/UsersModels');

const UN_REQ = 401;
const SECRET = 'meuacesso123';

const isValidJWT = async (req, res, next) => {

  const { authorization: token } = req.headers;

  if (!token) {
    return res
      .status(UN_REQ)
      .json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    const user = await UsersModels
      .findEmail(decoded.email);

    if (!user) {
      return res
        .status(UN_REQ)
        .json({ message: 'missing auth token' });
    }

    req.user = user;

    next();

  } catch (err) {
    return res
      .status(UN_REQ)
      .json({ message: err.message });
  }
};


const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, id + '.jpeg');
  },
});

const upload = multer({ storage });

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UsersController.addUser);

app.post('/login', UsersController.getLogin);

app.post('/recipes', isValidJWT, RecipesController.addNewRecipe);

app.get('/recipes', RecipesController.getAllRecipes);

app.get('/recipes/:id', RecipesController.getAllById);

app.put('/recipes/:id', isValidJWT, RecipesController.recipeToUpdate);

app.delete('/recipes/:id', isValidJWT, RecipesController.recipeToDelete);

app.put('/recipes/:id/image', upload.single('image'),
  isValidJWT, RecipesController.addNewRecipeImage);

module.exports = app;
