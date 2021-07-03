const router = require('express').Router();
const RecipesController = require('../controllers/recipes');

router.post('/', RecipesController.create);


module.exports = router;
