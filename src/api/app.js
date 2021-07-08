const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const Users = require('../controllers/users');
const Recipes = require('../controllers/recipes');

const jwtValid = require('../middlewares/jwtValid');
const userValid = require('../middlewares/userValid');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads/'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

app.post('/users', Users.addUser);
app.post('/users/admin', jwtValid, Users.addAdmin);

app.post('/login', Users.login);

app.post('/recipes', jwtValid, Recipes.addRecipe);
app.get('/recipes/:id', Recipes.getRecipeById);
app.get('/recipes', Recipes.getAllRecipes);
app.put('/recipes/:id', jwtValid, userValid, Recipes.updateRecipeById);
app.delete('/recipes/:id', jwtValid, userValid, Recipes.deleteRecipeById);

app.put(
  '/recipes/:id/image',
  jwtValid,
  userValid,
  upload.single('image'),
  Recipes.addRecipeImage
);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
