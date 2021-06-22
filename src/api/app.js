const express = require('express');
const multer = require('multer');
const path = require('path');

const ValidateUserDataMiddleware = require('../controllers/ValidateUserDataMiddleware');
const CreateNewUserMiddleware = require('../controllers/CreateNewUserMiddleware');
const AuthenticationMiddleware = require('../controllers/AuthenticationMiddleware');
const ValidateTokenMiddleware = require('../controllers/ValidateTokenMiddleware');
const CreateRecipeMiddleware = require('../controllers/CreateRecipeMiddleware');
const ListRecipesMiddleware = require('../controllers/ListRecipesMiddleware');
const UpdateRecipeMiddleware = require('../controllers/UpdateRecipeMiddleware');
const DeleteRecipeMiddleware = require('../controllers/DeleteRecipeMiddleware');
const SendImageMiddleware = require('../controllers/SendImageMiddleware');

const MulterStorage = require('../utils/multer');

const BAD_REQUEST = 400;

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname + 'src' + 'uploads')));

const MulterStorageMiddleware = multer({ storage: MulterStorage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', ValidateUserDataMiddleware, CreateNewUserMiddleware);
app.post('/login', AuthenticationMiddleware);
app.post(
  '/recipes',
  (req, res, next) => {
    const {name, preparation, ingredients} = req.body;
    if (!name || !preparation || !ingredients) {
      return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
    }

    next();
  },
  ValidateTokenMiddleware,
  CreateRecipeMiddleware
);

app.get('/recipes/:id', ListRecipesMiddleware);
app.get('/recipes', ListRecipesMiddleware);

app.put(
  '/recipes/:id/image',
  ValidateTokenMiddleware,
  MulterStorageMiddleware.single('image'),
  SendImageMiddleware,
);
app.put('/recipes/:id', ValidateTokenMiddleware, UpdateRecipeMiddleware);

app.delete('/recipes/:id', ValidateTokenMiddleware, DeleteRecipeMiddleware);

module.exports = app;
