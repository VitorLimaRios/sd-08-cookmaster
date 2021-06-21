const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');
const Authentication = require('../middlewares/authentication');
const Token = require('../middlewares/tokenValidation');
const User = require('../middlewares/userValidation');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads/'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

app.post('/users', userController.createUser);
app.post('/login', Authentication.getToken);
app.post('/recipes', Token.tokenValidation, recipeController.createRecipe);
app.get('/recipes', recipeController.getAllRecipes);
app.get('/recipes/:id', recipeController.getRecipeById);
app.put('/recipes/:id', Token.tokenValidation, User.userValidation,
  recipeController.updateRecipe);
app.delete('/recipes/:id', Token.tokenValidation, User.userValidation,
  recipeController.deleteRecipe);
app.put('/recipes/:id/image', Token.tokenValidation, User.userValidation,
  upload.single('image'), recipeController.updateImage);

app.get('/images/:id.jpeg', recipeController.getImage);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
