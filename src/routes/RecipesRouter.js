const router = require('express').Router();
const { validateJWT } = require('../auth/validateJWT');
const RecipesControlles = require('../controllers/RecipesControllers');
const { multerUpload } = require('../schemas/RecipesSchemas');

router.post('/', validateJWT, RecipesControlles.insertRecipe);
router.get('/', RecipesControlles.getRecipes);
router.get('/:id', RecipesControlles.getRecipeID);
router.put('/:id', validateJWT, RecipesControlles.editRecipe);
router.delete('/:id', validateJWT, RecipesControlles.deleteRecipe);
router.put('/:id/image', validateJWT, multerUpload()
  .single('image'), RecipesControlles.addImageRecipe);


module.exports = router;
