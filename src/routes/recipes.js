const express = require('express');
const multer = require('multer');
const recipesController = require('../controllers/recipes');

const middlewares = require('../middlewares');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const recipes = express.Router();

recipes.get('/', recipesController.readRecipes);
recipes.get('/:id', recipesController.readRecipeById);
recipes.post('/', middlewares.verifyToken ,  recipesController.createRecipe);
recipes.put('/:id', middlewares.verifyToken, recipesController.updateRecipe );
recipes.delete('/:id', middlewares.verifyToken, recipesController.deleteRecipe);
recipes.put('/:id/image', middlewares.verifyToken, upload.single('image'), 
  recipesController.addImageById);


module.exports = recipes;