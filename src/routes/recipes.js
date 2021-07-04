const router = require('express').Router();
const RecipesController = require('../controllers/recipes');

router.post('/', RecipesController.create);
router.get('/', RecipesController.getAll);
router.get('/:id', RecipesController.getById);
router.put('/:id', RecipesController.updateById);


module.exports = router;
