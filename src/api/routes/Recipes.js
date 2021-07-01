const express = require('express');
const router = express.Router();
const RecipesControllers = require('../controllers/Recipes');
const middlewareJWT = require('../middlewares/middlewareJWT_validate');
router.get('/:id' , RecipesControllers.findById);
router.put('/:id',middlewareJWT.JWT_validate ,RecipesControllers.updateById);
router.delete('/:id',middlewareJWT.JWT_validate ,RecipesControllers.deleteRecipe);
router.get('/',RecipesControllers.findAll);
router.post('/',middlewareJWT.JWT_validate ,RecipesControllers.createRecipes);


module.exports = router; 