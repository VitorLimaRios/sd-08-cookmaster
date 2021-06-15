const express = require('express');
const router = express.Router();

const RecipeController = require('../controllers/recipe');
const httpStatusCodes = require('../data/httpStatusCodes');
const middlewares = require('../middlewares');

router.get('/', RecipeController.getAll);
router.get('/:id', RecipeController.getById);

router.post('/', middlewares.auth, RecipeController.create);

router.put('/:id/image', [
  middlewares.auth,
  RecipeController.setImage,
  middlewares.uploads.single('image'),
  (req, res) => res.status(httpStatusCodes.OK).json(req.recipe)
]);

router.put('/:id', middlewares.auth, RecipeController.edit);

router.delete('/:id', middlewares.auth, RecipeController.remove);

module.exports = router;
