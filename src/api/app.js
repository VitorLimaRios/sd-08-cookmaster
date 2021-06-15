const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const middleware = require('../middlewares');

const app = express();

const storage = multer.diskStorage({
  destination: (_req, _file, callback)  => callback(null, 'src/uploads/'),
  filename: (req, _file, callback) => callback(null, `${req.params.id}.jpeg`)
});
const upload = multer({ storage });

app.use(bodyParser.json());

app.get('/', (_request, response) => response.send());

app.use('/images', express.static('src/uploads'));

app.post('/users', userController.createUser);
app.post('/login', userController.userLogin);

app.get('/recipes', recipeController.getRecipes);
app.get('/recipes/:id', recipeController.getRecipeById);
app.use(middleware.auth);
app.post('/recipes', recipeController.createRecipe);
app.put('/recipes/:id/image', upload.single('image'), recipeController.addRecipeImage);
app.put('/recipes/:id', recipeController.editRecipe);
app.delete('/recipes/:id', recipeController.deleteRecipe);

app.use(middleware.error);

module.exports = app;
