const express = require('express');
const rescue = require('express-rescue');
const recipesController = require('../controllers/recipesController');
const validateJWT = require('../middlewares/validateJWT');
const validateForm = require('../middlewares/validateForm');
const uploadImages = require('../middlewares/uploadImagesMiddleware');

const router = express.Router();

router.post('/recipes',
  validateJWT,
  validateForm,
  rescue(recipesController.createRecipe)
);
router.get('/recipes/:id',  rescue(recipesController.getRecipeById));
router.get('/recipes', rescue(recipesController.getAllRecipes));
router.put('/recipes/:id',
  validateJWT,
  validateForm,
  rescue(recipesController.updateRecipe)
);
router.delete('/recipes/:id', validateJWT, rescue(recipesController.deleteRecipe));
router.put('/recipes/:id/image/',
  validateJWT,
  uploadImages.single('image'),
  rescue(recipesController.uploadImages)
);
router.get('/images/:id',  rescue(recipesController.getImage));


module.exports = router;