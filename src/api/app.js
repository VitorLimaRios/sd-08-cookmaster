const express = require('express');
const multer = require('multer');
const path = require('path');
const UsersController = require('../controllers/UsersController');
const RecipesController = require('../controllers/RecipesController');
const validateJWT = require('../middlewares/validateJWT');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  }});
const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', UsersController.newUser);
app.post('/users/admin', validateJWT, UsersController.admin);
app.post('/login', UsersController.login);

app.post('/recipes', validateJWT, RecipesController.newRecipe);
app.get('/recipes', RecipesController.getRecipes);
app.get('/recipes/:id', RecipesController.getRecipeById);
app.put('/recipes/:id', validateJWT, RecipesController.update);
app.delete('/recipes/:id', validateJWT, RecipesController.remove);
app.put('/recipes/:id/image',
  validateJWT,
  upload.single('image'),
  RecipesController.image
);
app.get('/images/:id', RecipesController.getImage);

module.exports = app;
