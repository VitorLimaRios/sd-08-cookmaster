const router = require('express').Router();
const RecipesController = require('../controllers/recipes');

router.post('/', RecipesController.create);
router.get('/', RecipesController.getAll);
router.get('/:id', RecipesController.getById);
router.put('/:id', RecipesController.updateById);
router.delete('/:id', RecipesController.deleteById);


module.exports = router;
