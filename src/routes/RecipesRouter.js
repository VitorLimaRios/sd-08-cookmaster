const router = require('express').Router();
const { validateJWT } = require('../auth/validateJWT');
const RecipesControlles = require('../controllers/RecipesControllers');

router.post('/', validateJWT, RecipesControlles.insertRecipe);
router.get('/', RecipesControlles.getRecipes);
router.get('/:id', RecipesControlles.getRecipeID);

module.exports = router;
