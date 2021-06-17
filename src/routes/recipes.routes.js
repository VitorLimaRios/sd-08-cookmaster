const router = require('express').Router();

const useController = require('../controller/recipeController');

const authenticationToken = require('../middleware/authenticationToken.middleware');

const auth = require('../auth');

router.post('/', useController.addNewRecipe);

router.get('/', useController.list);

router.get('/:id', useController.find);

module.exports = router;
