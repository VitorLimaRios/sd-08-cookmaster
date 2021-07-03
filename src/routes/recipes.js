const router = require('express').Router();
const RecipesController = require('../controllers/recipes');

router.post('/', RecipesController.create);
router.get('/', RecipesController.getAll);


module.exports = router;
