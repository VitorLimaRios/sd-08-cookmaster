const router = require('express').Router();
const controllerRecipe = require('../controllers/recipes');

router.post('/', controllerRecipe.create);


module.exports = router;