const express = require('express');
const { auth } = require('../Middlewares/auth');
const { upload } = require('../Middlewares/uplead');
const { validateFormRecipes, validateId } = require('../Middlewares/form');
const controller = require('../controllers/recipe.controller');

const router = express.Router();

router.route('/')
  .post(auth, 
    validateFormRecipes,
    controller.register)
  .get(controller.findAll);

router.route('/:id')
  .get(validateId,
    controller.findById)
  .put(auth,
    validateFormRecipes,
    validateId, 
    controller.change)
  .delete(auth,
    validateId,
    controller.exclude);

router.route('/:id/image/')
  .put(auth, 
    upload(),
    controller.uploadOne);


module.exports = router;